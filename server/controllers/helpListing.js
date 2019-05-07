module.exports = config => {
  const helpers = require('../helpers')(config)

  const helpListingActions = require('../actions/helpListing')(config)

  return {
    createHelpListing: async (req, res, next) => {
      try {
        const listingId = await helpListingActions.create(req.body)
        const listingUrl = helpers.buildListingUrl(req, listingId)
        return res.jsend.success({ listingUrl })
      } catch (err) {
        // TODO: Use jsend.error/fail for "expected" errors
        next(err)
      }
    },

    getHelpListing: async (req, res, next) => {
      try {
        const listing = await helpListingActions.fetch(req.params.listingId)
        return res.jsend.success(listing)
      } catch (err) {
        // TODO: Use jsend.error/fail for "expected" errors
        next(err)
      }
    }
  }
}
