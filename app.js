// test houndci.com
var Hapi = require('hapi');
var users = require('./users');

var server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 7777
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply('<h1>Hello Hapi :)</h1');
  }
});

server.route({
  method: 'GET',
  path: '/users',
  handler: function(request, reply) {
    reply(users.findAll());
  }
});

server.route({
  method: 'GET',
  path: '/user/{id}',
  handler: function(request, reply) {
    var id = request.params.id;
    reply(users.findById(id));
  }
});

server.route({
  method: 'POST',
  path: '/newuser',
  handler: function(request, reply) {
    user = {
      id: request.payload.id,
      username: request.payload.username,
      name: request.payload.name,
      position: request.payload.position
    }
    users.save(user);
    reply(user);
  }
});

server.start(function() {
  console.log('Hapi running at: ', server.info.uri);
});