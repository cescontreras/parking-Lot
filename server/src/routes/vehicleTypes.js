const server = require("express").Router();
const { VehicleType } = require("../db");

server.get("/", (req, res) => {

  VehicleType.findAll()
    .then((types) => {
      res.status(200).json({types})
    })
})

module.exports = server;