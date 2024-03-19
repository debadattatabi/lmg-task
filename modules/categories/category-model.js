const util = require('util')
const logger = require('../../utils/logger')
const db = require('../../database/mysql')
/** @namespace */
const category = function () {

}

/** API To Delete Categories with their respective products
 * @param {number} category_id - Represents the Category ID.
 * @returns {Array} results - Removed Products List.
 */
category.removeCategoryDetails = function (options) {
  return new Promise((resolve, reject) => {
    // Method To Fetch All The Products Of That Category To Be Deleted
    db.sequelize.models.categorymappings.findAll({
      where: {
        category_id: options.category_id
      },
      raw: true
    }).then(async results => {
      try {
        // Method To Delete All Products of That Category
        await db.sequelize.models.categorymappings.destroy({
          where: {
            category_id: options.category_id
          }
        })
        logger.info(util.format('Categories Removed Successfully With Category ID: ', options.category_id))
        resolve(results)
      } catch (error) {
        logger.error(util.format('Error While Removing The Categories With Category ID: ', options.category_id + '. Error: %j', error))
        reject(error)
      }
    }).catch(error => {
      logger.error(util.format('Error While Fetching The Products With Category ID: ', options.category_id + '. Error: %j', error))
      reject(error)
    })
  })
}

module.exports = product