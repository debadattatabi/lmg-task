const service = require('./category-service')

module.exports = function (app) {
  // Delete Categories
  app.delete('/categories/remove', service.removeCategories)
}