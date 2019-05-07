const router = require('express').Router()

module.exports = config => {
  const helpListingController = require('../../controllers/helpListing')(config)

  router.route('/helpListing')
    // POST /api/[v1/]helpListing - submit help listing
    .post(helpListingController.createHelpListing)

  // test path
  router.route('/')
    .get((req, res) => {
      res.send(`(${req.protocol + '://' + req.get('host') + req.originalUrl}) API v1 OK`)
    })

  return router
}
