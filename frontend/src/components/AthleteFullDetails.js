// components/athlete/AthleteDetails.js

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditAthlete from "./EditAthlete";

class AthleteDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getSingleAthlete();
  }

  getSingleAthlete = () => {
    const { params } = this.props.match;
    axios
      .get(`http://localhost:5000/api/athletes/${params.id}`)
      .then(responseFromApi => {
        const theAthlete = responseFromApi.data;
        this.setState(theAthlete);
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderEditForm = () => {
    if (!this.state.title) {
      this.getSingleAthlete();
    } else {
      //                                                    {...props} => so we can have 'this.props.history' in Edit.js
      //                                                                                          ^
      //                                                                                          |
      return (
        <EditAthlete
          theAthlete={this.state}
          gettheAthlete={this.getSingleAthlete}
          {...this.props}
        />
      );
    }
  };

  // DELETE Athlete:
  deleteAthlete = () => {
    const { params } = this.props.match;
    axios
      .delete(`http://localhost:5000/api/athletes/${params.id}`)
      .then(responseFromApi => {
        this.props.history.push("/athletes"); // !!!
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h3>{this.state.url}</h3>
        <h3>{this.state.team}</h3>
        <h3>{this.state.sport}</h3>
        <h3>{this.state.league}</h3>
        <h3>{this.state.name}</h3>
        <h3>{this.state.position}</h3>
        <h3>{this.state.physicalMediatingFactorScore}</h3>
        <h3>{this.state.psychologicalMediatingFactorScore}</h3>
        <h3>{this.state.socialMediatingFactorScore}</h3>
        <h3>{this.state.physicalModeratingFactorScore}</h3>
        <h3>{this.state.psychologicalModeratingFactorScore}</h3>
        <h3>{this.state.socialModeratingFactorScore}</h3>
        <h3>{this.state.injuryRiskScore}</h3>
        <h3>{this.state.riskLevel}</h3>

        <button onClick={() => this.deleteAthlete()}>Delete Athlete</button>

        {this.renderEditForm()}

        <Link to={"/athletes"}>Back to Athletes</Link>
      </div>
    );
  }
}

export default AthleteDetails;
