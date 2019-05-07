module.exports = config => {
  return {
    buildListingUrl: (req, listingId) => (
      // User facing help page should be at /<listingId>
      `${req.protocol}://${req.get('host')}/${listingId}`
    )
  }
}
