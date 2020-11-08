import fastify from 'fastify'

const app = fastify()
app.get('/', async (request, reply) => reply.send({ foo: 'bar' }))

export default app
