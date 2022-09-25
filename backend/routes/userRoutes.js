import express from "express";
import User from "../models/userModel";
const router = express.Router();

router.post("/registeruser", async (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      password: newUser.password,
    });
  } else {
    res.status(401).send({ message: "Invalid User Data." });
  }
});

module.exports = router;
