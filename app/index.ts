import { createServer, proxy } from 'aws-serverless-express'
import { server } from './server'
import { connectDatabase } from './database'

// @ts-ignore sdfsdfs
export const handler = async (event, context, errorCallback) => {
  // This will re-use `cachedMongoConn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  // See https://docs.atlas.mongodb.com/best-practices-connecting-to-aws-lambda/
  // https://mongoosejs.com/docs/lambda.html
  context.callbackWaitsForEmptyEventLoop = false

  // eslint-disable-next-line no-console
  console.log('Connecting to database...')
  try {
    await connectDatabase()
    proxy(createServer(server), event, context)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Could not connect to database', { error })
    errorCallback(error)
  }
}
