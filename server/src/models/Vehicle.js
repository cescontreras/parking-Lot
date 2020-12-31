const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('vehicle', {
    type:{
      type: DataTypes.ENUM('motorcycle', 'sedan', 'truck'),
    }
  })
}