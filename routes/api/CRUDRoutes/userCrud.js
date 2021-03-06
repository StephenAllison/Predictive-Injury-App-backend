// routes/project-routes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../../models/User");
const uploadCloud = require("../../../config/cloudinary");

// GET route => to Get Full User Profile
router.get("/user", (req, res, next) => {
  User.find()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post(
  "/createNewUser",
  uploadCloud.single("imgPath"),
  (req, res, next) => {
    console.log("hahahaha");
    console.log(req.body);
    console.log(req.file);

    UserProfile.create({
      imgPath: req.file.url,
      sport: req.body.sport,
      league: req.body.league,
      team: req.body.team,
      name: req.body.name,
      staffingDivision: req.body.staffingDivision,
      role: req.body.role,
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    })
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// GET route => Find a Specific User by Id
router.get("/user/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      message: "Specified id is not valid"
    });
    return;
  }

  // our projects have array of tasks' ids and
  // we can use .populate() method to get the whole task objects
  //                                   ^
  //                                   |
  //                                   |
  User.findById(req.params.id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// PUT route => Update User Profile
router.put("/user/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      message: "Specified id is not valid"
    });
    return;
  }

  console.log(req.body);

  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `Profile ${req.params.id} has been updated successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

// DELETE route => to delete a specific User
router.delete("/user/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      message: "Specified id is not valid"
    });
    return;
  }

  Project.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `user with ${req.params.id} has been successfully removed.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
