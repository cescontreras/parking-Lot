const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("occupiedSpace", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		isOccupied: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
	});
};
