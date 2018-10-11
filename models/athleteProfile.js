const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const athleteProfileSchema = new Schema({
  imgPath: String,
  imgName: String,
  sport: String,
  league: String,
  team: String,
  name: String,
  position: String,
  currentInjuryStatus: String,
  physicalMediatingFactorScore: Number,
  psychologicalMediatingFactorScore: Number,
  socialMediatingFactorScore: Number,
  physicalModeratingFactorScore: Number,
  psychologicalModeratingFactorScore: Number,
  socialModeratingFactorScore: Number,
  injuryRiskScore: Number,
  riskLevel: String,
  coachingDecision: String
});

const AthleteProfile = mongoose.model("AthleteProfile", athleteProfileSchema);

module.exports = AthleteProfile;
