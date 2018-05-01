install: 
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js
publish:	
	npm publish
lint:
	npm run eslint .
watch:
	npm test -- --watch
test:
	npm test
