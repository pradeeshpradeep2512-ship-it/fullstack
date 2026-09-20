const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/anecdotes', (req, res, next) => {
  if (req.body.content && req.body.content.length < 5) {
    return res.status(400).json({ error: 'too short anecdote, must have length 5 or more' })
  }
  next()
})

server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001')
})
