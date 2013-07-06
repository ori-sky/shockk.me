var web = require('./web');
var server = new web.Server();

server.content_types.png = 'image/png';
server.content_types.css = 'text/css';
server.content_types.w = 'text/plain';

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
	response.write(template_name + '\n\n');

	var m_placeholder_value = undefined;

	while((m_placeholder_value = r_placeholder_value.exec(text)) !== null)
	{
		var placeholder_name = m_placeholder_value[1];
		var placeholder_value = m_placeholder_value[2];
		response.write(placeholder_name + ' = ' + placeholder_value + '\n\n');
	}
}

server.handlers.wt = false;

server.start();
