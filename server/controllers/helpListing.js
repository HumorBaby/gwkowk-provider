module.exports = config => {
  const helpers = require('../helpers')(config)

  const helpListingActions = require('../actions/helpListing')(config)

  return {
    createHelpListing: async (req, res, next) => {
      try {
        const listingId = await helpListingActions.create(req.body)
        res.jsend.success({ listingId })
      } catch (err) {
        // TODO: Use jsend.error/fail for "expected" errors
        next(err)
      }
    },

    getHelpListing: async (req, res, next) => {
      try {
        const listing = await helpListingActions.fetch(req.params.listingId)
        res.jsend.success(listing)
      } catch (err) {
        // TODO: Use jsend.error/fail for "expected" errors
        next(err)
      }
    },

    checkHelpListing: async (req, res, next) => {
      try {
        const listing = await helpListingActions.fetch(req.params.listingId)
        res.status(listing ? 200 : 404).end()
      } catch (err) {
        next(err)
      }
    }
  }
}
