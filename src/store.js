'use strict'

const fastifyPlugin = require('fastify-plugin')

const dataStore = async (fastify, options) => {
    const store = require('data-store')({path: options.file})
    fastify.decorate('store', store)
}

module.exports = fastifyPlugin(dataStore)
