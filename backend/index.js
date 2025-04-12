import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./db/connect.js";
import Email from './Route/email.route.js'


dotenv.config({ path: "./.env" }); 

const app = express();

app.use(cors());
app.use(express.json());


const apiPort = process.env.API_PORT || 3005;

connect()
  .then(() => {
    app.listen(apiPort, () => {
      console.log(`API Server is running on port ${apiPort}`);
    });
  })
  .catch((err) => {
    console.error(`MongoDB is not connected: ${err}`);
  });





app.use('/review',Email)






// httpServer.listen(3006,()=>{console.log("hey")});





