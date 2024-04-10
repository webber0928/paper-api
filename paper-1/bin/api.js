const appRoot = require('app-root-path');
const config = require('config');

const api = require(`${appRoot}/api/app.js`);

const port = process.env.PORT || 4000;

api.listen(port);
console.log(`Chatbot *GENERAL API* Start With '${config.get('mode')}' mode At ${port} Port`);