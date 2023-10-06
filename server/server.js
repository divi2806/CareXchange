import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import "./database/connect.js";

import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.post("/");
const username = "divyansh242805";
const password = "Alpha456";
const cluster = "cluster0";
const dbname = "courseApp";

mongoose.connect("mongodb+srv://divyansh242805:Alpha456@cluster0.hecanuw.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.listen(3000, () => {
    console.log("server started at port 3000.");
});
