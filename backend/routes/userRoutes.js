import express from "express";
import User from "../models/userModel";
const router = express.Router();

router.post("/registeruser", async (req, res) => {
  try {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = await user.save();
    if (newUser) {
      const tempUser = {
        _id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        password: newUser.password,
      };
      return res.json({ status: "ok", user: tempUser });
      // res.send();
    } else {
      res.status(401).send({ message: "Invalid User Data." });
    }
  } catch (error) {
    console.log(error);
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

router.put("/editUser", async (req, res) => {
  const user = await User.findById(req.body._id);
  console.log(req.body);
  console.log(user);

  if (!user) {
    return res
      .status(500)
      .json({ sucess: false, message: "Not able to find user ID" });
  }

  const tempUser = {
    _id: req.body._id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  };

  await User.findByIdAndUpdate(
    req.body._id,
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err.message);
      }
    }
  );
  // .clone()
  // .catch(function (err) {
  //   console.log(err);
  // });

  return res.json({ status: "ok", user: tempUser });
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
