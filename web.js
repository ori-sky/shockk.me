var fs = require('fs');
var http = require('http');
var url = require('url');

exports.Server = function()
{
	this.file_cache = {};

	this.content_types = {};
	this.content_caching = {};

	this.handlers = {
		fallback: function(request, response, request_url, data)
		{
			response.write(data);
		},
	};

	// cache a file from disk
	this.cache_file = function(name)
	{
		try
		{
			var data = fs.readFileSync('./public/' + name);
			this.file_cache[name] = data;
			console.log('[CACHE] cached ' + name);
		}
		catch(e)
		{
			delete this.file_cache[name] = data;
			console.log('[CACHE] uncached ' + name);
		}
	}.bind(this);

	// start the server
	this.start = function()
	{
		// store the date and time the server was started at
		this.start_date = new Date();

		// get all filenames in the public directory
		fs.readdir('./public/', function(err_dir, files)
		{
			if(err_dir)
			{
				console.log(err);
			}
			else
			{
				for(var iFile in files)
				{
					var name = files[iFile];
					if(name.match(/^\./) || name.match(/~$/) || name === '4913') continue;
					this.cache_file(name);
				}
			}
		}.bind(this));

		// set up a file system watch on the public directory
		fs.watch('./public/', function(e, name)
		{
			// ignore vi/vim magic files
			if(name.match(/^\./) || name.match(/~$/) || name === '4913') return;

			switch(e)
			{
				case 'change':
					this.cache_file(name);
					break;
			}
		}.bind(this));

		this.server = http.createServer();
		console.log('[HTTP] created');

		this.server.listen(80);
		var addr = this.server.address();
		console.log('[HTTP] listening on ' + addr.address + ':' + addr.port);

		this.server.on('request', this.cb_request);
		this.server.on('checkContinue', this.cb_checkContinue);
	}.bind(this);

	// receive requests and respond to them
	this.cb_request = function(request, response)
	{
		var request_url = url.parse(request.url, true);
		var safe_pathname = request_url.pathname.replace(/[^A-Za-z0-9_\-\.]/g, '');
		var safe_path = (safe_pathname !== '') ? safe_pathname : 'index.html';

		console.log('[HTTP] request from ' + request.socket.remoteAddress + ' for ' + safe_path);

		var parts = safe_path.split('.');
		var ext = (parts.length > 1) ? parts[parts.length - 1] : 'html';
		var content_type = (this.content_types[ext] !== undefined) ? this.content_types[ext] : 'text/html';
		var route = (this.handlers[content_type] !== undefined) ? content_type : 'fallback';

		if(this.file_cache[safe_path] === undefined)
		{
			console.log('[ERROR] 404 Not Found');
			response.statusCode = 404;

			if(this.file_cache['404.html'] === undefined)
			{
				response.setHeader('Content-Type', 'text/plain');
				response.write('404 Not Found');
			}
			else
			{
				response.setHeader('Content-Type', 'text/html');
				this.handlers[route](request, response, request_url, this.file_cache['404.html']);
			}

			response.end();
		}
		else
		{
			response.statusCode = 200;
			response.setHeader('Content-Type', content_type);
			this.handlers[route](request, response, request_url, this.file_cache[safe_path]);
			response.end();
		}
	}.bind(this);

	// prevent uploads which eat memory and other important stuff
	this.cb_checkContinue = function(request, response)
	{
		response.writeHead(400);
		response.end();
		request.socket.end();
	}.bind(this);
}
