const server = require("express").Router();
const { Vehicle } = require("../db");

server.get('/', (req, res) => {

  Vehicle.findAll()
    .then(vehicles => {
      res.status(200).json(vehicles)
    })
    .catch((e) => {
      res.status(400).json({e, msg: "Error"})
    })
})

server.post('/', (req, res) => {
  const { type } = req.body;

  Vehicle.create({type})
    .then(vehicle => {
      res.status(200).json(vehicle)
    })
    .catch((e) => {
      res.status(400).json({e, msg: "Error"})
    })
})

server.delete('/:id', (req, res) => {
  const { id } = req.params;

  Vehicle.destroy(
    {
      where:
      {
        id
      }
    })
    .then((v) => {
      res.status(200).json({msg: "Vehiculo Eliminado"})
    })
    .catch((e) => {
      res.status(400).json({e, msg: "Error"})
    })
})

module.exports = server;