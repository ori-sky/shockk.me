var emweb = require('emweb');
var emweb_wt = require('emweb-wt');
var server = new emweb.Server();

server.routes.default = 'home.w';
server.routes[404] = '404.w';

server.routes.phppathphp = function(request, response, request_url, data)
{
	response.setHeader('Content-Type', 'text/plain');

	/*
	response.setHeader('Content-Encoding', 'gzip');

	var i = 0;
	var s = 'No. ';
	var fn = function()
	{
		//response.write(server.file_cache['1000mb.gz']);
		response.write(s[i++ % s.length]);

		setTimeout(fn, 200);
	}

	fn();
	return false;
	*/

	response.write('No.');
};

server.content_types.png = 'image/png';
server.content_types.css = 'text/css';

server.cache_ignores.png = true;

server.handlers.w = emweb_wt.handlers.w;
server.handlers.wt = false;

server.start();
