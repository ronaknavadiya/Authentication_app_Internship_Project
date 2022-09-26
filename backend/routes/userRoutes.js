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

router.post("/loginUser", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    return res.json({ status: "ok", user: user });
  } else {
    return res.status(404).json({ status: "error", user: false });
  }
});

// app.post("/api/login", async (req, res) => {
//   const user = await User.findOne({
//     email: req.body.email,
//     password: req.body.password,
//   });

//   if (user) {
//     return res.json({ status: "ok", user: token });
//   } else {
//     return res.json({ status: "error", user: false });
//   }
// });

module.exports = router;
