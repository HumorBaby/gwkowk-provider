const router = require('express').Router()

module.exports = config => {
  const apiV1 = require('./v1')(config)

  router.use('/v1', apiV1)
  router.use('/', apiV1) // "/" defaults to "/v1"

  return router
}
