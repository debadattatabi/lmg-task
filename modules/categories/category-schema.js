const util = require('util')
const Validator = require('jsonschema').Validator
const logger = require('../../utils/logger')
const _validator = new Validator()

const schemas = function () {
}

schemas.removeCategories = {
  id: '/removeCategories',
  type: 'object',
  properties: {
    category_id: {
      type: 'string',
      required: true
    }
  }
}

schemas.validate = function (object, schema) {
  const errors = _validator.validate(object, schema).errors
  if (errors.length > 0) {
    logger.error(util.format('Schema validation failed for id:- %s errors:- %j', schema.id, errors))
  }
  return errors.length <= 0
}

module.exports = schemas