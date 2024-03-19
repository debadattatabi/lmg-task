const bodyParser = require('body-parser')
const compression = require('compression')
const util = require('util')
const config = require('../configurations/config')
const logger = require('../utils/logger')
const constants = require('../utils/constants')

module.exports = function (app) {
  // To catch uncaught exception and give an appropriate response to the user
  app.use(function (err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    logger.error(util.format('Uncaught exception caught, error:- %j', err))
    return res.status(constants.httpStatusCode.success).send({
      code: constants.responseCodes.failedOperation,
      message: constants.messageKeys.msg_failed,
      data: {}
    })
  })

  // Enable http logging
  if (config.get('server.enableHttpLogging')) { app.use(logger.startHttpLogger()) }

  // Enable compression
  if (config.get('server.enableCompression')) { app.use(compression()) }

  // Enable request body parsing
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: config.get('server.bodyParser.limit')
  }))

  // Enable request body parsing in JSON format
  app.use(bodyParser.json({
    limit: config.get('server.bodyParser.limit')
  }))

  // Enable request logger
  require('./requestLog')(app)
}