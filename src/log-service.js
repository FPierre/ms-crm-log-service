const cote = require('cote')
const app = require('http').createServer(() => {})
const io = require('socket.io').listen(app)
const { connect } = require('../db/connection')
const { init } = require('../db/init')
const Log = require('./log')

app.listen(5555)

// connect()
  // .then(() => init())
  // .catch(err => console.log(err))

const responder = new cote.Responder({
  name: 'log responder',
  key: 'log'
})
const publisher = new cote.Publisher({
  name: 'log publisher',
  broadcasts: ['statusUpdate'],
  namespace: 'monitoring',
  key: 'monitoring'
})
const sockend = new cote.Sockend(io, {
  name: 'log sockend',
  namespace: 'monitoring',
  key: 'monitoring'
})

responder.on('create', ({ event, model, note, user }) => {
  return new Log({ event, model, note, _userId: user.id }).save()
})

setInterval(() => {
  console.log('publish')
  publisher.publish('statusUpdate', [{ event: 'Event', model: 'Agency', createdAt: Date.now }])
}, 2000)
