const express = require("express");
const userController = require("../controllers/userController");


const userRoutes = express.Router();


userRoutes.post("/", userController.addUser);


module.exports = userRoutes;
