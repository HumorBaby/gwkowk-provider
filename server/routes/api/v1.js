const router = require('express').Router()

// TODO: each route starts with /helpListing... you know what to do.

module.exports = config => {
  const helpListingController = require('../../controllers/helpListing')(config)

  // POST /api/v1/helpListing - submit help listing
  router.post('/helpListing', helpListingController.createHelpListing)

  // HEAD /api/v1/helpListing/:listingId - check if listing exists
  router.head('/helpListing/:listingId', helpListingController.checkHelpListing)

  // GET /api/v1/helpListing/:listingId - get specific help listing
  router.get('/helpListing/:listingId', helpListingController.getHelpListing)

  // test path
  router.route('/')
    .get((req, res) => {
      res.send(`(${req.protocol + '://' + req.get('host') + req.originalUrl}) API v1 OK`)
    })

  return router
}
