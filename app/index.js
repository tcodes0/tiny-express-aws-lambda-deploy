export const handler = async (event, context, callback) => {
  // server must return json
  return {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  }
}
