import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

config({ path: `.env.${ process.env.NODE_ENV }` });

import { registerUser } from "./src/routes/registerUser.route.js";
import { loginUser } from ".src/routes/loginUser.route.js";
import { createPeep } from ".src/routes/createPeep.route.js";
import { getPeeps } from "./src/routes/getPeeps.route.js";

const port = process.env.PORT;
const host = process.env.HOST;
const app = express();

const main = async () => {
    console.log(`Connecting to DB @ ${process.env.DB_URI}`);
    await mongoose.connect(process.env.DB_URI);
    console.log(`Connected to DB @ ${process.env.DB_URI}`);
}

main().catch(err => console.log(err));

app.use(express.json());
app.use(cors());
app.use("/register", registerUser);
app.use("/login", loginUser);
app.use("/createPeep", createPeep);
app.use("/getPeeps", getPeeps);

const server = app.listen(port, host, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is running on <http://$>{SERVERHOST}:${SERVERPORT}`);
});

export default server;