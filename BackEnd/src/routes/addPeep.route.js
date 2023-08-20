import express from "express";
import { addPeepController, editPeepController, deletePeepController, getAllPeepController } from "../controllers/addPeep.controller.js";

const router = express.Router();

router.route("/add")
    .post(addPeepController);

router.route("/edit")
    .post(editPeepController);

router.route("/getAll")
    .get(getAllPeepController);

router.route("/delete")
    .post(deletePeepController);

export { router as peepRouter };

