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
    // const {imgPath, description} = this.state;
    const imgPath = this.state.imgPath;
    const description = this.state.description;
    axios
      .post("http://localhost:5000/api/athletes", {
        imgPath,
        sport,
        league,
        team,
        name,
        position,
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
        this.setState({ imgPath: "", sport: "" });
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
          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={e => this.handleChange(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateNewAthlete;
