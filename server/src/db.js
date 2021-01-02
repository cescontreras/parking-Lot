require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
// const { DATABASE_URL } = process.env;
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
 
const sequelize = new Sequelize(
	// `${DATABASE_URL}`,
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/parkinglot`,
	{
		logging: false, // set to console.log to see the raw SQL queries		
	}
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
	Vehicle,
	ParkingSpace, 
	VehicleType,
	OccupiedSpace
} = sequelize.models;

//-------RELACIONES

Vehicle.belongsToMany(ParkingSpace, {through: OccupiedSpace});
ParkingSpace.belongsToMany(Vehicle, {through: OccupiedSpace});

Vehicle.belongsTo(VehicleType);
VehicleType.hasMany(Vehicle);

//-----------------
const spaces = [
	{size: "small", number: 1},{size: "small", number: 2},{size: "small", number: 3},
	{size: "medium", number: 4},{size: "medium", number: 5},{size: "medium", number: 6},
	{size: "large", number: 7},{size: "large", number: 8},{size: "large", number: 9}
]
ParkingSpace.bulkCreate(spaces, {
	raw: true,
	updateOnDuplicate: ["number"], 
}).then(() => console.log("Parking Lot Created"));


const types = [{type:"motorcycle"}, {type: "sedan"},{type:"truck"}]
VehicleType.bulkCreate(types, {
	raw: true,
	updateOnDuplicate: ["type"], 
}).then(() => console.log("Types Created"));

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
