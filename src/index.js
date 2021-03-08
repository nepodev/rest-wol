const fastify = require('fastify');
const settings = require('./settings')
const app = fastify(settings.fastify);

app.register(require('fastify-oas'), settings.swagger);
app.register(require('fastify-cors'), settings.cors)

app.register(require('./store'), settings.store)

app.register(require('./routes'))

// Run the server!
const start = async () => {
  try {
    await app.listen(settings.server)
    app.log.info(`server listening on ${app.server.address().port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
