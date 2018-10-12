// routes/project-routes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const athleteProfile = require("../../../models/athleteProfile");
const uploadCloud = require("../../../config/cloudinary");

const multer = require("multer");

// GET route => to Get Full Athlete Profile
router.get("/athleteProfie", (req, res, next) => {
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

router.get("/athletes", (req, res, next) => {
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
  uploadCloud.single("imgPath"),
  (req, res, next) => {
    console.log("hahahaha");
    console.log(req.body);
    console.log(req.file);

    athleteProfile
      .create({
        imgPath: req.file.url,

        sport: req.body.sport,
        league: req.body.league,
        team: req.body.team,
        name: req.body.name,
        position: req.body.position,
        currentInjuryStatus: req.body.currentInjuryStatus,
        physicalMediatingFactorScore: req.body.physicalMediatingFactorScore,
        psychologicalMediatingFactorScore:
          req.body.psychologicalMediatingFactorScore,
        socialMediatingFactorScore: req.body.socialMediatingFactorScore,
        physicalModeratingFactorScore: req.body.physicalModeratingFactorScore,
        psychologicalModeratingFactorScore:
          req.body.psychologicalModeratingFactorScore,
        socialModeratingFactorScore: req.body.socialModeratingFactorScore,
        overallPhysiologicalHealth: req.body.overallPhysiologicalHealth,
        overallPsychologicalHealth: req.body.overallPsychologicalHealth,
        overallSociologicalHealth: req.body.overallSociologicalHealth,
        injuryRiskScore: req.body.injuryRiskScore,
        medicalNote: req.body.medicalNote,
        coachingDecision: req.body.coachingDecision
      })
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
  uploadCloud.single("imgPath"),
  (req, res, next) => {
    console.log("AthleteUpdatedSuccessfuly");
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
        injuryStatus: req.body.injuryStatus,
        physicalMediatingFactorScore: req.body.physicalMediatingFactorScore,
        psychologicalMediatingFactorScore:
          req.body.psychologicalMediatingFactorScore,

        socialMediatingFactorScore: req.body.socialMediatingFactorScore,
        physicalModeratingFactorScore: req.body.physicalModeratingFactorScore,
        psychologicalModeratingFactorScore:
          req.body.psychologicalModeratingFactorScore,
        socialModeratingFactorScore: req.body.socialModeratingFactorScore,
        injuryRiskScore: req.body.injuryRiskScore,
        medicalNote: req.body.medicalNote,
        coachingDecision: req.body.coachingDecision
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
