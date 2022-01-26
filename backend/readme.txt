server:
mkdir my-proj
terminal:
• npm init
• npm install
– Shortcut: npm i
– Example: npm i lodash

create server.js file
terminal:
• node server.js to run server
• nodemon server.js to run server
nodemon start

install nodemon to create live server
terminal:
• nodemon server.js to run live server
* power shelll if nodemon wont run
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

• edit package.json
add:
 "start": "nodemon --ignore \"./data\" server.js",
 to ignore data folder
terminal:
• nodemon start to run live server with data ignore

create routing with express app to get data

front end:

cerate index
app
componets
service
    get data from back end express created routing 

add vue cli details:
npm install -g @vue/cli
npm i all depenencies
npm start / npm serve to run server
npm run build
"build": "vue-cli-service build --dest ../backend/public"


date order:
name.json > name.service.js(back) > server.js(live nodemon server) > name.service.js(front) > name-app.js

git push heroku HEAD:master