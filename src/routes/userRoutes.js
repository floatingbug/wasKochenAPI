const express = require("express");
const userController = require("../controllers/userController");
const authUser = require("../middleware/authUser");


const userRoutes = express.Router();


userRoutes.get("/", authUser, userController.getUser);
userRoutes.post("/", userController.addUser);
userRoutes.post("/create-token", userController.createToken);


module.exports = userRoutes;
