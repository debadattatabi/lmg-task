const common = require('../../utils/common')
const schemas = require('./category-schema')
const category = require('./category-model')
const constants = require('../../utils/constants')

const removeCategories = function (req, res) {
  const removedData = common.sanitize(req.query, schemas.removeCategories, constants.moduleNames.category)
  if (schemas.validate(removedData, schemas.removeCategories)) {
    category.removeCategoryDetails(removedData).then((response) => {
      res.status(constants.httpStatusCode.success).send({
        code: response === false ? constants.responseCodes.failedOperation : constants.responseCodes.successfulOperation,
        message: constants.messageKeys.msg_success,
        data: response
      })
    }).catch((error) => {
      return res.status(constants.httpStatusCode.success).send({
        code: constants.responseCodes.failedOperation,
        message: constants.messageKeys.msg_revalidate,
        data: error
      })
    })
  } else {
    // Incomplete Data
    return res.status(constants.httpStatusCode.success).send({
      code: constants.responseCodes.revalidation,
      message: constants.messageKeys.msg_failed,
      data: {}
    })
  }
}

module.exports = {
  removeCategories: removeCategories
}