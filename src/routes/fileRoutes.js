import express from "express";
import fileController from "../controllers/fileController.js";
import multer from "multer";


const fileRoutes = express.Router();
const upload = multer({ dest: "uploads/" });


fileRoutes.post("/", upload.single("image"), fileController.addDishImage);


export default fileRoutes;
