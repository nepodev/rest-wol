
const { version, description } = require('../package.json')

const settings = {
  server: {
    port: 3000,
    host: 'localhost',
  },
  fastify: {
    "logger": true
  },
  store: {
    file: "recent.json"
  },
  cors: {
    origin: true
  },
  swagger: {
    routePrefix: '/doc',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Web Wake on lan',
        description: description,
        version: version
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Dev Service'
        }
      ],
      //schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  }
}

// read config
try {
  const { server, store, fastify, swagger, cors } = require('../config.json')
  if (server) {
    settings.server = server
  }

  if (fastify) {
    settings.fastify = fastify
  }

  if (store) {
    settings.store = store
  }

  if (cors) {
    settings.cors = cors
  }
    
  if (swagger) {
    if (swagger.host) {
      settings.swagger.swagger.host = swagger.host
    }
    if (swagger.servers) {
      settings.swagger.swagger.servers = swagger.servers
    }
    if (swagger.schemes) {
      settings.swagger.swagger.schemes = swagger.schemes
    }
  }
} catch(e) {
  /* ignore */
  console.log('No config.json. running with default settings')
}

module.exports = settings
