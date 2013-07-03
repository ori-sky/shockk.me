var web = require('./web');
var server = new web.Server();
server.content_types.png = 'image/png';
server.start();
