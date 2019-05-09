module.exports = config => {
  const helpListingActions = require('../actions/helpListing')(config)

  return {
    createHelpListing: async (req, res, next) => {
      try {
        const listingId = await helpListingActions.create(req.body)
        res.jsend.success({ listingId })
      } catch (err) {
        next(err)
      }
    },

    getHelpListing: async (req, res, next) => {
      try {
        const listing = await helpListingActions.fetch(req.params.listingId)
        listing
          ? res.jsend.success(listing)
          : res.status(404).jsend.fail('Help listing not found.')
      } catch (err) {
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
