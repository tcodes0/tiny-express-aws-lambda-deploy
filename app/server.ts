import express from 'express'
export const server = express()

// @ts-ignore asdf
server.get('/', (req, res) => {
  res.send('implement server here')
})
