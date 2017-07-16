const cote = require('cote')
const { connect } = require('../db/connection')
const { init } = require('../db/init')
const Log = require('./log')

connect()
  // .then(() => init())
  // .catch(err => console.log(err))

const responder = new cote.Responder({ name: 'log responder', key: 'log' })
const publisher = new cote.Publisher({ name: 'log publisher', key: 'log', broadcasts: ['logStream'] })

responder.on('create', ({ event, model, note, user }) => {
  return new Log({ event, model, note, _userId: user.id }).save()
})

setInterval(() => publisher.publish('logStream', Log.find({})), 2000)
