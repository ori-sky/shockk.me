var util = require('util');
var web = require('./web');
var server = new web.Server();

server.routes.default = 'home.w';
server.routes[404] = '404.w';

server.content_types.png = 'image/png';
server.content_types.css = 'text/css';

server.cache_ignores.png = true;

server.handlers.wt = false;

var r_template_name = /\*\*([A-Za-z0-9_\-\.]+)\*\a*/m;
var r_placeholder = /\<\*([A-Za-z0-9_\-\.]+)\*\>/mg;
var r_placeholder_value = /[^\*]\*([A-Za-z0-9_\-\.]+)\*((.|[\n])+?)\*\*/mg;

server.handlers.w = function(request, response, request_url, data)
{
	var text = data.toString('utf8');
	var m_template_name = r_template_name.exec(text);

	if(m_template_name === null || m_template_name[1] === undefined)
	{
		console.log('[WT] no template file specified');
		return;
	}

	var template_name = m_template_name[1];

	var m_placeholder_value = undefined;
	var placeholder_values = {};

	while((m_placeholder_value = r_placeholder_value.exec(text)) !== null)
	{
		placeholder_values[m_placeholder_value[1]] = m_placeholder_value[2];
	}

	if(server.file_cache[template_name] === undefined)
	{
		console.log('[WT] template file does not exist');
		return;
	}

	var response_data = server.file_cache[template_name].toString('utf8');

	for(var k in placeholder_values)
	{
		response_data = response_data.replace('<*' + k + '*>', placeholder_values[k]);
	}

	// parse out unset placeholders
	response_data = response_data.replace(r_placeholder, '');

	// send the data
	response.write(response_data);
}

server.start();
