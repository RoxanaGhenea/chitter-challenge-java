import express from "express";
import { addUserController, editUserController, deleteUserController, getAllUsersController, loginController } from "../controllers/addUser.controller.js";

const router = express.Router();

router.route("/add")
    .post(addUserController);

router.route("/edit")
    .post(editUserController);

router.route("/getAll")
    .get(getAllUsersController);

router.route("/delete")
    .post(deleteUserController);

router.route("/login")
    .post(loginController);

export { router as userRouter };