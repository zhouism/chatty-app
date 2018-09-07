Chatty App
=====================
Chatty App is a single page React app that allows users to send and receive text messages in real-time using any web browser.

!["Main Page"] (https://github.com/zhouism/chatty-app/blob/master/docs/Screen%20Shot%202018-09-07%20at%201.41.03%20PM.png?raw=true)
### Getting Started
1. Follow the instructions to setup and run the Chatty App Server.
2. Fork this repo to your local machine.
3. Run npm install to install dependencies.
Make a copy of .env.example to .env and change the CLIENT_HOST address or CLIENT_PORT number as you see fit. Change the SERVER_HOST and SERVER_PORT so that it matches the corresponding settings in the Server's .env file.
4. Run npm start to start the app server.
5. Get yourself and your friends to go to the CLIENT host address and port specified above in your browsers and start chatting.

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* Node.js 6.0.0 or higher
* React
* ReactDOM
* ws
* webpack-dotenv-plugin
