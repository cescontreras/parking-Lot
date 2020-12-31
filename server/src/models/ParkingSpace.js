const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('parkingSpace', {
    size:{
      type: DataTypes.ENUM('small','medium','large')
    }
  })
}