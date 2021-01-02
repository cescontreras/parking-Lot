const server = require("express").Router();
const { Vehicle, ParkingSpace, OccupiedSpace } = require("../db");

//----- get Queue
server.get("/queue", (req, res) => {

	Vehicle.findAll({ 
    where: { 
      isWaiting: true 
    },
    order: [["arrivalDate", "ASC"]] 
  })
		.then((vehicles) => {
			res.status(200).json(vehicles);
		})
		.catch((e) => {
			res.status(400).json({ e, msg: "Error" });
		});
});

//------------------ADD vehicle
server.post("/", (req, res) => {
	const { type, owner } = req.body;
//----create vehicle on queue
	Vehicle.create({ type, owner })
		.then((vehicle) => {
			let filter = ["small", "medium", "large"];
			if (vehicle.dataValues.type === "sedan") {
				filter = ["medium", "large"];
			}
			if (vehicle.dataValues.type === "truck") {
				filter = ["large"];
			}
//-----find out if there is availables spaces for thah vehicle
			ParkingSpace.findOne({
				where: {
					isOccupied: false,
					size: filter,
				},
			}).then((space) => {
        //-- if don't, just get out
        if(!space){
          return res.status(200).json({msg: "Parking Lot Full"})
        }
        //--- if ok, update parking space as occupied
				ParkingSpace.update(
					{
						isOccupied: true,
					},
					{
						where: {
							number: space.dataValues.number,
						},
          }
        )
        .then(() => {
          //--- get the vehicle out of the queue
          Vehicle.update(
            {
              isWaiting: false
            },
            {
              where: {
                id: vehicle.dataValues.id
              }
            }
          )        
          .then(() => {
            //-----set instances relationship
            vehicle.addParkingSpace(space.dataValues.number)
              .then(() => {
                res.status(200).json({msg: "Vehicle Parked"});
              });
          });
        })
			});
		})
		.catch((e) => {
			res.status(400).json({ e, msg: "Error" });
		});
});

server.delete("/:id", (req, res) => {
	const { id } = req.params;

	Vehicle.destroy({
		where: {
			id,
		},
	})
		.then((v) => {
			res.status(200).json({ msg: "Vehiculo Eliminado" });
		})
		.catch((e) => {
			res.status(400).json({ e, msg: "Error" });
		});
});

module.exports = server;
