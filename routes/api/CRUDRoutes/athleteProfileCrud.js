// routes/project-routes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const athleteProfile = require("../../../models/athleteProfile");
const uploadCloud = require("../../../config/cloudinary");

const multer = require("multer");

// GET route => to Get Full Athlete Profile
router.get("/athleteProfile", (req, res, next) => {
  athleteProfile
    .find()
    // .populate("moderators")
    // .populate("mediators")
    .then(athleteFullProfile => {
      res.json(athleteFullProfile);
    })
    .catch(err => {
      res.json(err);
    });
});

// POST route => to create a new Athlete Profile

router.post(
  "/createNewAthlete",
  uploadCloud.single("photo"),
  (req, res, next) => {
    athleteProfile.create({
      imgPath: `https://res.cloudinary.com/dw7omfinb/image/upload/${
        req.file.originalname
      }`,
      imgName: req.file.originalname,
      sport: req.body.sport,
      league: req.body.league,
      team: req.body.team,
      name: req.body.name,
      position: req.body.position,
      physicalMediatingFactorScore: req.body.physicalMediatingFactorScore,
      psychologicalMediatingFactorScore:
        req.body.psychologicalMediatingFactorScore,
      socialMediatingFactorScore: req.body.socialMediatingFactorScore,
      physicalModeratingFactorScore: req.body.physicalModeratingFactorScore,
      psychologicalModeratingFactorScore:
        req.body.psychologicalModeratingFactorScore,
      socialModeratingFactorScore: req.body.socialModeratingFactorScore,
      injuryRiskScore: req.body.injuryRiskScore,
      riskLevel: req.body.riskLevel
    });
    athleteProfile.save();
    console
      .log("++++++REQ.FILE++++++++", req.file)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.json(err);
      });
  }
);

//GET route => Find Athlete By ID
router.get("/athlete/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      message: "Specified id is not valid"
    });
    return;
  }

  athleteProfile
    .findById(req.params.id)
    .then(response => {
      res.json(response);
      console.log(response);
    })
    .catch(err => {
      res.json(err);
      console.log(err);
    });
});
//PUT route => Update Athlete
router.put(
  "/updateAthleteProfile/:id",
  uploadCloud.single("photo"),
  (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        message: "Specified id is not valid"
      });
      return;
    }
    const imgPath = req.file.url;
    const athleteID = req.params.id
      .findByIdAndUpdate(athleteID, {
        imgPath: req.file.url,
        imgName: req.file.originalname,
        sport: req.body.sport,
        league: req.body.league,
        team: req.body.team,
        name: req.body.name,
        position: req.body.position,
        physicalMediatingFactorScore: req.body.physicalMediatingFactorScore,
        psychologicalMediatingFactorScore:
          req.body.psychologicalMediatingFactorScore,
        socialMediatingFactorScore: req.body.socialMediatingFactorScore,
        physicalModeratingFactorScore: req.body.physicalModeratingFactorScore,
        psychologicalModeratingFactorScore:
          req.body.psychologicalModeratingFactorScore,
        socialModeratingFactorScore: req.body.socialModeratingFactorScore,
        injuryRiskScore: req.body.injuryRiskScore,
        riskLevel: req.body.riskLevel
        // password:     hashPass,
      })
      .then(() => {
        res.json({
          message: `Profile ${req.params.id} has been updated successfully.`
        });
      })
      .catch(err => {
        res.json(err);
      });
  }
);
//Delete route => Delete Athlete
router.delete("/deleteAthlete/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      message: "Specified id is not valid"
    });
    return;
  }

  athleteProfile
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Athlete with ${req.params.id} has been successfully removed.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
