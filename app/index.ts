// import fastify from 'fastify'

// const app = fastify()
// app.get('/', async (request, reply) => reply.send({ foo: 'bar' }))

export const handler = (event: any, context: any, callback: any) => {
  callback('bar')
}
