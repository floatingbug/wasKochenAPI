const express = require("express");
const dishController = require("../controllers/dishController");


const dishRoutes = express.Router();


dishRoutes.get("/", dishController.getDishes);
dishRoutes.post("/", dishController.addDish);
dishRoutes.delete("/", dishController.deleteDish);
dishRoutes.patch("/", dishController.updateDish);


module.exports = dishRoutes;
