module.exports = function (sequelize, DataTypes) {
    const subcategories = sequelize.define('subcategories', {
      subcategory_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(80),
        allowNull: false
      }
    }, {
      tableName: 'subcategories',
      timestamps: true,
      classMethods: {}
    })
    subcategories.associate = function (models) {
      subcategories.belongsTo(models.categories, {
        as: 'product_categories',
        targetKey: 'category_id',
        foreignKey: 'category_id'
      })
    }
    return subcategories
  }