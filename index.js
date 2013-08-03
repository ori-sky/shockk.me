var emweb = require('emweb');
var emweb_wt = require('emweb-wt');
var server = new emweb.Server();

server.routes.default = 'home.w';
server.routes[404] = '404.w';

var cb_skids = function(request, response, request_url, data)
{
	response.setHeader('Content-Type', 'text/plain');
	response.write('No.');
};
server.routes.phppathphp = cb_skids;

server.content_types.png = 'image/png';
server.content_types.css = 'text/css';

server.cache_ignores.png = 102400;

server.handlers.w = emweb_wt.handlers.w;
server.handlers.wt = false;

server.start();
