const mongoose = require('mongoose')

let conn
const defineSchema = config => {
  const conn = require('../services/database')(config)

  const helpListingSchema = new mongoose.Schema({
    /**
    * Help listing document schema.
    */

    // TODO: validations; e.g., empty/require fields

    listingId: { // alphanum char string to ID listing; generated on save
      type: String,
      index: true,
      unique: true
    },
    botNick: {
      type: String,
      required: true
    },
    serverHostname: String,
    helpPrefix: {
      type: String,
      required: true
    },
    // Help entries
    modules: {
      type: [{
        _id: false,
        moduleName: String,
        entries: {
          type: [{
            _id: false,
            commands: { type: [String] }, // Command(s)
            doc: String, // Command doc/purpose
            examples: { type: [String] } // Command example(s)
          }],
          required: true,
          _id: false,
          validate: {
            validator: v => v !== null && v.length > 0,
            message: () => 'At least 1 command entry is required per module.'
          }
        }
      }],
      required: true,
      validate: {
        validator: v => v !== null && v.length > 0,
        message: () => 'At least 1 module is required.'
      },
      _id: false
    }
  })

  const CHARACTER_SPACE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  helpListingSchema.statics.genRandomId = function (length = 4) {
    let result = []
    while (result.length < length) {
      result.push(CHARACTER_SPACE.charAt(Math.floor(Math.random() * CHARACTER_SPACE.length)))
    }

    return result.join('')
  }

  // avoid listingIds that are confusing if present in the API route path (e.g., help);
  // undesired words can be added here as well (e.g., profanity).
  // use lowercase _only_ for easier case-insensitive search; i.e., HeLP == hELp == help
  const FORBIDDEN_STRINGS = ['help']
  helpListingSchema.pre('save', async function (cb) {
    let genIdRetriesRemaining = 10 // Number of times to try to get a valid/unique listingId
    let newListingId

    while (genIdRetriesRemaining-- > 0) {
      newListingId = this.constructor.genRandomId()

      if (
        !(await this.constructor.findOne({ listingId: newListingId })) && // unique
        !(FORBIDDEN_STRINGS.includes(newListingId.toLowerCase())) // not a forbidden string
      ) {
        this.listingId = newListingId
        cb()
        break
      }
    }
    // Was not able to generate unique listing ID
    cb(Error('Could not generate unique listing ID.'))
  })

  return conn.model('HelpListing', helpListingSchema)
}

let instance
module.exports = config => {
  if (instance && conn.models.HelpListing) { return instance }
  instance = defineSchema(config)
  return instance
}
