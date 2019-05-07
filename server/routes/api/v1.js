const router = require('express').Router()

module.exports = config => {
  const helpListingController = require('../../controllers/helpListing')(config)

  // POST /api/v1/helpListing - submit help listing
  router.post('/helpListing', helpListingController.createHelpListing)

  // GET /api/v1/helpListing/:listingId - get specific help listing
  router.get('/helpListing/:listingId', helpListingController.getHelpListing)

  // test path
  router.route('/')
    .get((req, res) => {
      res.send(`(${req.protocol + '://' + req.get('host') + req.originalUrl}) API v1 OK`)
    })

  return router
}
