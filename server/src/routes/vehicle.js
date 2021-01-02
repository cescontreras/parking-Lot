const server = require("express").Router();
const { Vehicle, ParkingSpace, OccupiedSpace } = require("../db");

//----- get Queue
server.get("/queue", (req, res) => {
	Vehicle.findAll({ where: { isWaiting: true } })
		.then((vehicles) => {
			res.status(200).json(vehicles);
		})
		.catch((e) => {
			res.status(400).json({ e, msg: "Error" });
		});
});

//----- add vehicle
server.post("/", (req, res) => {
	const { type, owner } = req.body;

	Vehicle.create({ type, owner })
		.then((vehicle) => {
			let filter = ["small", "medium", "large"];
			if (vehicle.dataValues.type === "sedan") {
				filter = ["medium", "large"];
			}
			if (vehicle.dataValues.type === "truck") {
				filter = ["large"];
			}

			ParkingSpace.findOne({
				where: {
					isOccupied: false,
					size: filter,
				},
			}).then((space) => {
        if(!space){
          return res.status(200).json({msg: "Parking Lot Full"})
        }
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
          vehicle.addParkingSpace(space.dataValues.number)
            .then(() => {
              res.status(200).json(vehicle);
            });
				});
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
