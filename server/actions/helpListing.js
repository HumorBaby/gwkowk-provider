module.exports = config => {
  const HelpListing = require('../models/helpListing')(config)

  return {
    create: async data => {
      const helpListing = await HelpListing.create(data)
      return helpListing.listingId
    },

    fetch: async listingId => {
      let helpListing = await HelpListing.findOne({ listingId }, '-_id -__v').lean()
      return helpListing
    }
  }
}
