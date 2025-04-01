const express = require("express");
const dishController = require("../controllers/dishController");
const authUser = require("../middleware/authUser");


const dishRoutes = express.Router();


dishRoutes.get("/", dishController.getDishes);
dishRoutes.post("/", authUser, dishController.addDish);
dishRoutes.delete("/", authUser, dishController.deleteDish);
dishRoutes.patch("/", authUser, dishController.updateDish);


module.exports = dishRoutes;
