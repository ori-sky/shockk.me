var server = new require('./web').Server();
server.content_types.png = 'image/png';
server.content_types.css = 'text/css';
server.start();
