var emweb_wt = require('emweb-wt');

module.exports = function()
{
	this.routes.default = 'home.w';
	this.routes[404] = '404.w';

	var cb_skids = function(request, response, request_url, data)
	{
		response.setHeader('Content-Type', 'text/plain');
		response.write('No.');
	};
	this.routes.phppathphp = cb_skids;
	this.routes.headers = cb_skids;

	this.content_types.png = 'image/png';
	this.content_types.css = 'text/css';

	this.cache_ignores.default = 204800;

	this.handlers.w = emweb_wt.handlers.w;
	this.handlers.wt = false;
}
