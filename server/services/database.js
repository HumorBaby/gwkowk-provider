const logger = require('../helpers/logger')

const makeConnection = config => {
  // Clear old mongoose instance from cache
  delete require.cache[require.resolve('mongoose')]
  const mongoose = require('mongoose')

  mongoose.set('useCreateIndex', true)

  mongoose.connect(config.database.mongodb_uri, { useNewUrlParser: true })
    .then(() => { logger.debug('Connected to database.') })

  return mongoose.connection
}

// Maintain single database connection
let instance
module.exports = config => {
  if (instance && (instance.readyState > 0 && instance.readyState < 3)) return instance
  instance = makeConnection(config)
  return instance
}
