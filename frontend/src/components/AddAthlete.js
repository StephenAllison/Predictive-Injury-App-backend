// components/athletes/CreateNewAthlete.js

import React, { Component } from "react";
import axios from "axios";

class CreateNewAthlete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgPath: "",
      sport: "",
      league: "",
      team: "",
      name: "",
      position: "",
      injuryStatus: "",
      physicalMediatingFactorScore: "",
      psychologicalMediatingFactorScore: "",
      socialMediatingFactorScore: "",
      physicalModeratingFactorScore: "",
      psychologicalModeratingFactorScore: "",
      socialModeratingFactorScore: "",
      injuryRiskScore: "",
      riskLevel: ""
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    // const {imgPath, sport,league,team,name, position, injuryStatus,} = this.state;
    const imgPath = this.state.imgPath;
    const sport = this.state.sport;
    const league = this.state.league;
    const team = this.state.team;
    const name = this.state.name;
    const position = this.state.position;
    const injuryStatus = this.state.injuryStatus;
    const physicalMediatingFactorScore = this.state
      .physicalMediatingFactorScore;
    const psychologicalMediatingFactorScore = this.state
      .psychologicalMediatingFactorScore;
    const socialMediatingFactorScore = this.state.socialMediatingFactorScore;
    const physicalModeratingFactorScore = this.state
      .physicalModeratingFactorScore;
    const psychologicalModeratingFactorScore = this.state
      .psychologicalModeratingFactorScore;
    const socialModeratingFactorScore = this.state.socialModeratingFactorScore;
    const injuryRiskScore = this.state.injuryRiskScore;
    const riskLevel = this.state.riskLevel;

    axios
      .post("http://localhost:5000/api/createnewathletes", {
        imgPath,
        sport,
        league,
        team,
        name,
        position,
        injuryStatus,
        physicalMediatingFactorScore,
        psychologicalMediatingFactorScore,
        socialMediatingFactorScore,
        physicalModeratingFactorScore,
        psychologicalModeratingFactorScore,
        socialModeratingFactorScore,
        injuryRiskScore,
        riskLevel
      })
      .then(() => {
        this.props.getData();
        this.setState({
          imgPath: "",
          sport: "",
          league: "",
          team: "",
          name: "",
          position: "",
          physicalMediatingFactorScore: "",
          psychologicalMediatingFactorScore: "",
          socialMediatingFactorScore: "",
          physicalModeratingFactorScore: "",
          psychologicalModeratingFactorScore: "",
          socialModeratingFactorScore: "",
          injuryRiskScore: "",
          riskLevel: ""
        });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    //   ^ this is just fancy syntax for the 2 lines below
    //   const name = event.target.name;
    //   const value = event.target.value;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>imgPath:</label>
          <input
            type="text"
            name="imgPath"
            value={this.state.imgPath}
            onChange={e => this.handleChange(e)}
          />
          <label>Sport:</label>
          <textarea
            name="sport"
            value={this.state.sport}
            onChange={e => this.handleChange(e)}
          />
          <label>League:</label>
          <textarea
            name="league"
            value={this.state.league}
            onChange={e => this.handleChange(e)}
          />
          <label>Team:</label>
          <textarea
            name="team"
            value={this.state.team}
            onChange={e => this.handleChange(e)}
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={e => this.handleChange(e)}
          />
          <label>Name:</label>
          <textarea
            name="name"
            value={this.state.name}
            onChange={e => this.handleChange(e)}
          />
          <label>Position:</label>
          <textarea
            name="position"
            value={this.state.position}
            onChange={e => this.handleChange(e)}
          />
          <label>Physiological Mediating Factor Score:</label>
          <textarea
            name="physicalMediatingFactorScore"
            value={this.state.physicalMediatingFactorScore}
            onChange={e => this.handleChange(e)}
          />
          <label>Psychological Mediating Factor Score:</label>
          <textarea
            name="psychologicalMediatingFactorScore"
            value={this.state.psychologicalMediatingFactorScore}
            onChange={e => this.handleChange(e)}
          />
          <label>Sociological Mediating Factor Score:</label>
          <textarea
            name="socialMediatingFactorScore"
            value={this.state.socialMediatingFactorScore}
            onChange={e => this.handleChange(e)}
          />
          <label>Physiological Moderating Factor Score:</label>
          <textarea
            name="physicalModeratingFactorScore"
            value={this.state.physicalModeratingFactorScore}
            onChange={e => this.handleChange(e)}
          />
          <label>psychologicalModeratingFactorScore:</label>
          <textarea
            name="psychologicalModeratingFactorScore"
            value={this.state.psychologicalModeratingFactorScore}
            onChange={e => this.handleChange(e)}
          />
          <label>Injury Risk Score:</label>
          <textarea
            name="injuryRiskScore"
            value={this.state.injuryRiskScore}
            onChange={e => this.handleChange(e)}
          />
          <label>Risk Level:</label>
          <textarea
            name="riskLevel"
            value={this.state.riskLevel}
            onChange={e => this.handleChange(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateNewAthlete;
