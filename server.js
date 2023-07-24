import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const { DB_HOST, PORT } = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful.")
    });
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });

// wIdRI3J1I7o2CahR


