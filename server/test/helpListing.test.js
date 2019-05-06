const path = require('path')
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.test') })

describe('Help Listing', () => {
  require('./helpListing/helpListing.model.test')
})
