const express = require("express");
const fileController = require("../controllers/fileController");
const multer = require("multer");


const fileRoutes = express.Router();
const upload = multer({ dest: "uploads/" });


fileRoutes.post("/", upload.single("image"), fileController.addDishImage);


module.exports = fileRoutes;
