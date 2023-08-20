import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

if (process.argv.length > 2) {
    config({ path: `.env.${ process.argv[2] }` });
} else {
    config({ path: `.env` });
}

import { peepRouter } from "./src/routes/addPeep.route.js";
import { userRouter } from "./src/routes/user.route.js";

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
// const corsOptions ={
//     origin:'*', 
//     credentials:true,            
//access-control-allow-credentials:true
//     optionSuccessStatus:200,
//  }
app.use(cors());
app.use("/peep", peepRouter);
app.use("/user", userRouter);

const server = app.listen(port, host, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is running on http://${SERVERHOST}:${SERVERPORT}`);
});



export default server;