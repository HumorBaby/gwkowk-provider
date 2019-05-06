const express = require('express')
const morgan = require('morgan')

const logger = require('./helpers/logger')

const config = require('./config')

const app = express()
// Used behind a proxy (e.g., as is with Google App Engine)
if (process.env.NODE_ENV === 'production') { app.set('trust proxy', true) }

app.use(morgan('dev', { stream: logger.stream }))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Initialize connection to database on app load
require('./services/database')(config)

module.exports = app
