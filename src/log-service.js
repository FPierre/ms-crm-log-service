const cote = require('cote')

const responder = new cote.Responder({ name: 'log responder', key: 'log' })
const publisher = new cote.Publisher({ name: 'log publisher', key: 'log', broadcasts: ['logUpdate'] })

// DB mocking
let index = 0
const logs = []

responder.on('create', ({ type, event }, cb) => {
  logs.push({ id: index++, event: event, createdAt: new Date() })
  cb()
})

setInterval(() => publisher.publish('logUpdate', logs), 2000)
