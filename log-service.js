const cote = require('cote')
const responder = new cote.Responder({ name: 'log responder' })
const publisher = new cote.Publisher({ name: 'log publisher', broadcasts: ['logUpdate'] })

// DB mocking
const logs = [
  { id: 1, event: 'Agency creation', createdAt: new Date() }
]

responder.on('create', ({ type, log }, cb) => {
  logs.push(log)
  cb()
})

setInterval(() => publisher.publish('logUpdate', logs), 2000)
