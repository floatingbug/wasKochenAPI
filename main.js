require("dotenv").config();
const {connectDB} = require("./src/config/db");
const express = require("express");
const cors = require("cors");
const dishRoutes = require("./src/routes/dishRoutes");
const fileRoutes = require("./src/routes/fileRoutes");
const userRoutes = require("./src/routes/userRoutes");
const response = require("./src/utils/response");


const app = express();
const PORT = process.env.PORT || 3000;


connectDB();

app.use(cors({
	origin: "*",
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static("uploads"));

app.use("/dish", dishRoutes);
app.use("/file", fileRoutes);
app.use("/user", userRoutes);


app.use((err, req, res, next) => {
	console.log("Fatal error: ", err);
	response.errorResponse({
		res,
		code: 500,
		errors: ["Internal Server Error."],
	});
});


app.listen(PORT, () => {
	console.log("App is listening on port: ", PORT)
});
