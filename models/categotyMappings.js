module.exports = function (sequelize, DataTypes) {
    const categorymappings = sequelize.define('categorymappings', {
      maping_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      gender: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      subcategory_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      tableName: 'categorymappings',
      timestamps: true,
      classMethods: {}
    })
    categorymappings.associate = function (models) {
        categorymappings.belongsTo(models.categories, {
            as: 'product_mapping_categories',
            targetKey: 'category_id',
            foreignKey: 'category_id'
        }),
        categorymappings.belongsTo(models.subcategories, {
            as: 'subcategory_mapping_item_id',
            targetKey: 'subcategory_id',
            foreignKey: 'subcategory_id'
        }),
        categorymappings.belongsTo(models.subcategoryitems, {
            as: 'sub_category_items_id',
            targetKey: 'item_id',
            foreignKey: 'item_id'
        })
    }
    return categorymappings
  }