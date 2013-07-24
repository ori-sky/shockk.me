var emweb = require('emweb');
var emweb_wt = require('emweb-wt');

var server = new emweb.Server();

server.routes.default = 'home.w';
server.routes[404] = '404.w';

server.content_types.png = 'image/png';
server.content_types.css = 'text/css';

server.cache_ignores.png = true;

server.handlers.w = emweb_wt.handlers.w;
server.handlers.wt = false;

server.start();
