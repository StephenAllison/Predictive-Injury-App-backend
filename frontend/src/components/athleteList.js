// components/athleteList.js

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddAthlete from "./AddAthlete";

class AthleteList extends Component {
  constructor() {
    super();
    this.state = { listOfAthletes: [] };
  }

  getAllAthletes = () => {
    axios
      .get("http://localhost:5000/api/projects")
      .then(responseFromApi => {
        this.setState({
          listOfAthletes: responseFromApi.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getAllAthletes();
  }

  render() {
    return (
      <div>
        <div style>
          {this.state.listOfAthletes.map((athlete, index) => {
            return (
              <div key={athlete._id}>
                <Link
                  to={`/backend/./routes/api/CRUDRoutes/athleteProfileCrud.js/${
                    athlete._id
                  }`}
                >
                  <h3>{athlete.imgPath}</h3>
                  <h3>{athlete.Team}</h3>
                  <p>{athlete.name}</p>
                  <p>{athlete.position}</p>
                  <p>{athlete.injuryStatus}</p>
                  <p>{athlete.riskLevel}</p>
                  <p>{athlete.coachingDecision}</p>
                </Link>
                <p style={{ maxWidth: "400px" }}>{athlete.description} </p>
              </div>
            );
          })}
        </div>
        <div>
          <createNewAthlete getData={() => this.getAllAthletes()} />
        </div>
      </div>
    );
  }
}

export default AthleteList;
