var fs = require('fs');
var http = require('http');
var url = require('url');

exports.start = function()
{
	this.start_date = new Date();

	this.server = http.createServer();
	console.log('[HTTP] created');

	this.server.listen(80);
	var addr = this.server.address();
	console.log('[HTTP] listening on ' + addr.address + ':' + addr.port);

	this.server.on('request', function(request, response)
	{
		var request_url = url.parse(request.url, true);
		console.log('[HTTP] request from ' + request.socket.remoteAddress + ' for ' + request_url.pathname);

		var response_data = 'yes, hello';

		response.writeHead(200, {
			'Last-Modified': this.start_date.toUTCString(),
			'Content-Length': response_data.length,
			'Content-Type': 'text/html; charset=utf-8'
		});
		response.write('yes, hello');
		response.end();
	}.bind(this));
}
