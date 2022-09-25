import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import userRoute from "./routes/userRoutes";

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/",
  {
    dbName: "authentication-app",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => (err ? console.log(err) : console.log("Connected to Database"))
);

app.use("/api/", userRoute);

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.listen(4000, () => {
  console.log("Server started");
});
