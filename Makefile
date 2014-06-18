DIR=/usr/local/nginx/html

deploy:
	cp -rfv public/* $(DIR)
