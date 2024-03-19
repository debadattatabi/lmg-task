module.exports = function (sequelize, DataTypes) {
    const categories = sequelize.define('categories', {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        trim: true
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }, {
      hooks: {},
      tableName: 'categories',
      timestamps: true,
      classMethods: {}
    })
    return categories
  }