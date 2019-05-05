const express = require('express')
const morgan = require('morgan')

const logger = require('./helpers/logger')

const app = express()
// Used behind a proxy (e.g., as is with Google App Engine)
if (process.env.NODE_ENV === 'production') { app.set('trust proxy', true) }

app.use(morgan('dev', { stream: logger.stream }))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

module.exports = app
