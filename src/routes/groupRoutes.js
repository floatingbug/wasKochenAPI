const express = require("express");
const authUser = require("../middleware/authUser");
const groupController = require("../controllers/groupController");


const groupRoutes = express.Router();


groupRoutes.get("/get-groups", authUser, groupController.getGroups);
groupRoutes.post("/create-group", authUser, groupController.createGroup);


module.exports = groupRoutes;
