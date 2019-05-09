const express = require('express')
const morgan = require('morgan')
const jsend = require('jsend')

const logger = require('./helpers/logger')

const config = require('./config')

const app = express()
// Used behind a proxy (e.g., as is with Google App Engine)
app.set('trust proxy', true)

app.use(morgan('dev', { stream: logger.stream }))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(jsend.middleware)

// Initialize connection to database on app load
require('./services/database')(config)

// Routes
app.use('/api', require('./routes/api')(config))

// Final error handler
app.use((err, req, res, next) => {
  logger.error('%o', err)
  res.status(500).jsend.error(err)
})

module.exports = app
