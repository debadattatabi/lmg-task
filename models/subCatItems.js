module.exports = function (sequelize, DataTypes) {
    const subcategoryitems = sequelize.define('subcategoryitems', {
      item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      subcategory_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(80),
        allowNull: false
      }
    }, {
      tableName: 'subcategoryitems',
      timestamps: true,
      classMethods: {}
    })
    subcategoryitems.associate = function (models) {
      subcategoryitems.belongsTo(models.subcategories, {
        as: 'subcategory_item_id',
        targetKey: 'subcategory_id',
        foreignKey: 'subcategory_id'
      })
    }
    return subcategoryitems
  }