**template.wt**

*TITLE*Home**

*BODY*
<div class="page-header">
	<h3><small>I'm David Farrell. I'm primarily a Node.js developer but I do a lot of web development and I've also worked with C/C++, Objective-C, C# and Java. This is my portfolio.</small></h3>
</div>

<div class="row-fluid">
	<div class="span3"><h3 class="muted">Web Server</h3></div>
	<div class="span9">
		<p>When I began thinking about building my portfolio, I wanted to make something more than just another programmer portfolio website with a little something about myself and a list of my projects. I wanted to be able to present the site itself as part of my portfolio.</p>
		<p>I decided the first step would be to write a micro web server. I wanted something much lighter than Apache and other existing web servers, and which could meet the needs for my portfolio without weighing it down. Being the Node.js enthusiast I am, I opted to write my web server in this.</p>
		<p>The core of the web server is only 158 lines of code and supports mapping file extensions to content types, a custom 404 page with a plaintext fallback in the case of error, and caching of web resources, with the ability to ignore caching for certain file extensions. Custom handlers can be written for specific file extensions, with the default/fallback handler simply routing the file data to the client.</p>
		<p>Drawbacks. Pretty much the biggest drawback is that the server is only able to serve files in the <code>public/</code> directory. This is a temporary solution to the issue of requests containing special directories such as <code>..</code> and I plan to work around it in the future.</p>
		<p>On this website, the web server is configured with PNG files mapping to <code>image/png</code> and CSS files mapping to <code>text/css</code> as you would expect. A cache ignore it added for PNG files to avoid issues with huge images. The default page is <code>home.w</code> and the 404 page is <code>404.w</code>. The file extension <code>.wt</code> is ignored by the web server and will trigger a 404. This will be explained in <span class="muted">Web Templates</span>.</p>
	</div>
</div>
<div class="row-fluid">
	<div class="span3"><h3 class="muted">Bootstrap</h3></div>
	<div class="span9">
		<p>Once I had a <i>barely</i> functional web server, I started considering my options. In the past, I've usually written websites from the ground up, originally sticking very closely to XHTML 1.1 and then adopting newer technologies such as CSS 3 and HTML 5. I'm still a fan of building stuff from the ground up but this time, I've opted to use <a href="http://twitter.github.io/bootstrap/">Twitter Bootstrap</a>. Bootstrap is a really nice front-end framework which does all the heavy lifting to get websites to look right on all of the major web browsers, with the added bonus of providing some beautiful controls for common things required on web pages.</p>
		<p>If you've never heard of Bootstrap, I recommend you take a look at the source code of this page <b>right now</b> to see what it's all about. Then I recommend you click the link above to see what it's really all about. I'm no expert in using Bootstrap - this is the first website I've used it with - but it's incredibly easy to make stuff look great with it.</p>
	</div>
</div>
<div class="row-fluid">
	<div class="span3"><h3 class="muted">Web Templates</h3></div>
	<div class="span9">
		
	</div>
</div>
<div class="row-fluid">
	<div class="span3"><h3 class="muted">Open Source</h3></div>
	<div class="span9">
		
	</div>
</div>
**
