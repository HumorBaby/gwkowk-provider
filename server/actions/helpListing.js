module.exports = config => {
  const HelpListing = require('../models/helpListing')(config)

  return {
    create: async data => {
      const helpListing = await HelpListing.create(data)
      return helpListing.listingId
    }
  }
}
