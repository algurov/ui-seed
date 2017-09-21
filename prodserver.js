"use strict";
const compression = require('compression')
const express = require('express'),

path = require('path');

const E2E_PORT = require('./constants').E2E_PORT;
const HOST = require('./constants').HOST;
const PROD_PORT = require('./constants').PROD_PORT;
const API_BASE_URL = `http://${HOST}:${PROD_PORT}`;
const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));
var properties = null;
app.use(compression());
app.use(express.static('dist/client'));

const renderIndex = (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/client/index.html'));
}

app.get('/external', function (req, res) {
  callProperties(res, loginPropertiesCallback);
})
app.get('/*', renderIndex);


let e2e;
const ENV = process.env.npm_lifecycle_event;
if (ENV === 'e2e:server') { e2e = E2E_PORT };
const PORT = e2e || PROD_PORT;

app.listen(PORT, () => {
  console.log(`Listening on: http://${HOST}:${PORT}`);
});

function callProperties(res, callbackFunc) {
  var token = new Buffer("root:password").toString('base64');
  var request = require('request');
  var options = {hostname: HOST,
    port: 8888,
    path: '/seed/Application/master',
    uri: `http://${HOST}:8888/seed/Application/master`,
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + token
    }};
  request(options, function (error, response, body) {
    callbackFunc(body, res);
  });
}

function propertiesCallback(response, res) {
  properties = JSON.parse(response);
  console.log('Properties');
  console.log(properties);
}

function loginPropertiesCallback(response, res) {
  properties = JSON.parse(response);
  var authServer = null;
  var authConsumer = null;
  console.log(properties);
  for (var i = 0, len = properties.propertySources.length; i < len; i++) {
      if (authServer && authConsumer) {
        break;
      }
      if (properties.propertySources[i].source['authorizationServer.base.url']) {
        authServer = properties.propertySources[i].source['authorizationServer.base.url'];
      }
      if (properties.propertySources[i].source['oauth2consumer.base.url']) {
        authConsumer = properties.propertySources[i].source['oauth2consumer.base.url'];
      }
  }

  authServer = authServer.replace('localhost', HOST);
  authConsumer = authConsumer.replace('localhost', HOST);
  console.log(authServer);
  console.log(authConsumer);
  var result = authServer + 'oauth/authorize'+ '?response_type=code&client_id=client_seed&state=';
  var goto = encodeURIComponent(API_BASE_URL + '/main');
  var gotoOnFail = encodeURIComponent(API_BASE_URL + '/login');
  var state = encodeURIComponent('client_id=client_seed&goto=' + goto + '&gotoOnFail=' + gotoOnFail);
  result = result + state + '&redirect_uri=' + authConsumer + 'authorize';
  console.log(result);
  res.redirect(result);
}

function redirectToLoginPage() {
  if (!properties) {
    callProperties()
  }
}
