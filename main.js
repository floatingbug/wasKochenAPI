import "dotenv/config";
import {connectDB} from "./src/config/db.js";
import express from "express";
import cors from "cors";
import dishRoutes from "./src/routes/dishRoutes.js";
import fileRoutes from "./src/routes/fileRoutes.js";
import response from "./src/utils/response.js";


const app = express();
const PORT = process.env.PORT || 3000;


connectDB();

app.use(cors({
	origin: "*",
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static("upload"));

app.use("/dish", dishRoutes);
app.use("/file", fileRoutes);


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
