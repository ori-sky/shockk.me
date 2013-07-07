var fs = require('fs');
var http = require('http');
var url = require('url');

exports.Server = function()
{
	this.do_cache_updates = true;

	this.file_cache = {};
	this.content_types = {};
	this.content_caching = {};
	this.routes = {};
	this.cache_ignores = {};

	this.routes.default = 'index.html';
	this.routes[404] = '404.html';

	this.handlers = {
		fallback: function(request, response, request_url, data)
		{
			response.write(data);
		},
	};

	// cache a file from disk
	this.cache_file = function(name)
	{
		var parts = name.split('.');
		var ext = (parts.length > 1) ? parts[parts.length - 1] : '';

		if(this.cache_ignores[ext] != true)
		{
			try
			{
				var data = fs.readFileSync('./public/' + name);
				this.file_cache[name] = data;
				console.log('[CACHE] cached ' + name);
			}
			catch(e)
			{
				delete this.file_cache[name];
				console.log('[CACHE] uncached ' + name);
			}
		}
		else
		{
			console.log('[CACHE] ignored ' + name);
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

		if(this.do_cache_updates === true)
		{
			// set up a file system watch on the public directory
			fs.watch('./public/', function(e, name)
			{
				// ignore vi/vim magic files
				if(name.match(/^\./) || name.match(/~$/) || name === '4913') return;

				switch(e)
				{
					case 'change':
					case 'rename':
						this.cache_file(name);
						break;
				}
			}.bind(this));
		}

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
		var safe_path = (safe_pathname !== '') ? safe_pathname : this.routes.default;

		console.log('[HTTP] request from ' + request.socket.remoteAddress + ' for ' + safe_path);

		response.statusCode = 200;
		this.do_route(safe_path, request, response, request_url, false);
	}.bind(this);

	this.do_route = function(safe_path, request, response, request_url, fallback_404)
	{
		var parts = safe_path.split('.');
		var ext = (parts.length > 1) ? parts[parts.length - 1] : 'html';
		var content_type = (this.content_types[ext] !== undefined) ? this.content_types[ext] : 'text/html';
		var route = (this.handlers[ext] !== undefined) ? ext : 'fallback';

		var data = (this.cache_ignores[ext] === true) ? fs.readFileSync('public/' + safe_path) : this.file_cache[safe_path];

		if(data === undefined || typeof this.handlers[route] !== 'function')
		{
			console.log('[ERROR] 404 Not Found');

			if(fallback_404)
			{
				response.setHeader('Content-Type', 'text/plain');
				response.write('404 Not Found\n404 Not Found for 404 Not Found document');
			}
			else
			{
				this.do_route(this.routes[404], request, response, request_url, true);
			}

			response.end();
		}
		else
		{
			response.setHeader('Content-Type', content_type);
			this.handlers[route](request, response, request_url, data);
			response.end();
		}
	}

	// prevent uploads which eat memory and other important stuff
	this.cb_checkContinue = function(request, response)
	{
		response.writeHead(400);
		response.end();
		request.socket.end();
	}.bind(this);
}
