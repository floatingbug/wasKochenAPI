const express = require("express");
const authUser = require("../middleware/authUser");
const weekPlanController = require("../controllers/weekPlanController");


const weekPlanRoutes = express.Router();


weekPlanRoutes.get("/", authUser, weekPlanController.getWeekPlan);
weekPlanRoutes.post("/", authUser, weekPlanController.setWeekPlan);


module.exports = weekPlanRoutes;
