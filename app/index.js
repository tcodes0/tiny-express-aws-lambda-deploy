import { createServer, proxy } from 'aws-serverless-express'
import { server } from './server'

export const handler = (event, context, errorCallback) => {
  // This will re-use `cachedMongoConn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  // See https://docs.atlas.mongodb.com/best-practices-connecting-to-aws-lambda/
  // https://mongoosejs.com/docs/lambda.html
  context.callbackWaitsForEmptyEventLoop = false

  try {
    return proxy(createServer(server), event, context)
  } catch (error) {
    errorCallback(error)
  }
}
