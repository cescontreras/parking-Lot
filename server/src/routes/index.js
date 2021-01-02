const { Router } = require("express");
const vehicleRouter = require("./vehicle.js");
const parkingSpaceRouter = require("./parkingSpace.js");
const vehicleTypeRouter = require("./vehicleTypes.js");

const router = Router();

router.use("/vehicle", vehicleRouter);
router.use("/parkingspace", parkingSpaceRouter);
router.use("/vehicletype", vehicleTypeRouter);

module.exports = router;
