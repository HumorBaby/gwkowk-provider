const path = require('path')
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.test') })

const should = require('chai').should()

const NEW_LISTING_GOOD = {
  botNick: 'Sopel',
  serverHostname: 'testing.example.net',
  helpPrefix: '.',
  modules: [
    {
      moduleName: 'adminchannel',
      entries: [
        {
          commands: ['kickban', 'kb'],
          doc: `Kick and ban a user from the channel

          The bot must be a channel operator for this command to work.`,
          examples: [
            '.kickban [#chan] user1 user!@ get out of here'
          ]
        }
      ]
    },
    {
      moduleName: 'calc',
      entries: [
        {
          commands: ['c', 'calc'],
          doc: 'Evaluate some calculation.',
          examples: [
            '.c 5 + 3',
            '.c 0.9*10',
            '.c 5 // 2'
          ]
        }
      ]
    }
  ]
}

describe('Model', () => {
  let config
  let conn
  let HelpListing

  before(() => {
    config = require('../../config')
    conn = require('../../services/database')(config)

    HelpListing = require('../../models/helpListing')(config)
  })

  after(done => {
    // Potentially affects other tests if left in cache
    delete require('mongoose').models.HelpListing
    conn.close(done)
  })

  beforeEach(done => {
    conn.dropDatabase(done)
  })

  it('should save new help listing with listing ID', async () => {
    let listing = new HelpListing(NEW_LISTING_GOOD)
    await listing.save()
    listing.isNew.should.be.false // if saved, isNew is false
    should.exist(listing.listingId) // listingId should be exist (be set)
  })

  it('should fetch existing help listing from listing ID', async () => {
    let existingListing = new HelpListing(NEW_LISTING_GOOD)
    await existingListing.save()

    let match = await HelpListing.findOne({ listingId: existingListing.listingId }).lean()
    should.exist(match)
    ;(match._id.equals(existingListing._id)).should.be.true // both objects refer to the same document
  })

  it('should generate new random listing ID if not unique during save')
  it('should generate new random listing ID if in forbidden string list')
})
