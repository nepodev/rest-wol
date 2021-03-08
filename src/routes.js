'use strict'

const wol = require('wol')

module.exports = async (fastify, options) => {

  const { store } = fastify

  fastify.route({
    method: ['GET', 'POST'],
    url: '/wake',
    schema: {
      description: 'wakeup device with MAC Address {mac}',
      query: {
        type: 'object',
        description: 'optional infos',
        required: ['mac'],
        properties: {
          mac: {
                type: 'string',
                pattern: '^[0-9a-fA-F]{2}([:-][0-9a-fA-F]{2}){4}[:-][0-9a-fA-F]{2}$',
                description: 'MAC address with separator : or -'
              },
          name: {
          type: ['string', 'null'],
          description: 'device- or computername',
          default: null
        }
      }
    }
  },
  handler: async (request, reply) => {
      const mac = request.query.mac.replace(/-/g, ':').toLowerCase()
      const resp = { mac }
      try {
        resp.wol = await wol.wake(mac)
        store.set(mac, request.query.name)
      } catch (e) {
        resp.error = e
      }
      reply.send(resp)
    }
  })

  fastify.route({
    method: ['GET'],
    url: '/recent',
    schema: {
      description: 'List recent MAC addresses'
    },
    handler: async (request, reply) => {
      reply.send(store.data)
    }
  })
}
