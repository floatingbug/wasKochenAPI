import express from "express";
import dishController from "../controllers/dishController.js";


const dishRoutes = express.Router();


dishRoutes.get("/", dishController.getDishes);
dishRoutes.post("/", dishController.addDish);
dishRoutes.delete("/", dishController.deleteDish);
dishRoutes.patch("/", dishController.updateDish);


export default dishRoutes;
