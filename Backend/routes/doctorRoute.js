import express from "express";
import { doctorList } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

//create endpoint for all doctor list
doctorRouter.get("/list", doctorList);

export default doctorRouter;
