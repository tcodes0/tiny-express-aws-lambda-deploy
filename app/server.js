import express from 'express'
export const server = express()

server.get('/', (req, res) => {
  res.status(200).json({
    result: 'hello',
  })
})
