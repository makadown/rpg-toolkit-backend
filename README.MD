# RPG-TOOLKIT-BACKEND

This project is the backend of the angular web app. Made in Express/Node

# Creation process

1) install express

> npm install express --save

2)  install nodemon (only for developing)

> npm install -g nodemon

then add to package.json the `"start": "nodemon app.js"` in the scripts section.

When developing to heroku, make sure to change back to `"start": "node app.js"`.

3) install mongoose (check moongosejs.com)

> npm install mongoose --save

4) install body parser. This is needed because it extract the entire body portion of an incoming request stream and exposes it on req.body. (https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express)

> npm install body-parser --save

5) install unique validator.  This is for future implementations to make sure i wont repeat names at any collection between documents.

> npm install --save mongoose-unique-validator