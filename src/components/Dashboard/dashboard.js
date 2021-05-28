import React, { Component } from "react";
import Doctors from "./Doctors";
import PatientList from "../PatientsDetails/PatientsList";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import LoggedInPatientList from "../PatientsDetails/loggedInPatientList";
import SpecialistsView from "../specialists/specialistsView";
class Dashboard extends Component {
  render() {
    const { patientsRequests, auth, profile } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else if (profile.type === "patient") {
      console.log(auth.uid);
      return (
        <div className="container">
          <div className="card z-depth-0 project-summary">
            <span className="card-title">Your Requests</span>

            <LoggedInPatientList />
          </div>
        </div>
      );
    } else if (profile.type === "GP") {
      if (!patientsRequests) {
        return <div>Loading Requests...</div>;
      }
      return (
        <div className="dashboard container ">
          <div className="row ">
            <div className="col s12 m6" >
              <div className="z-index-0 ">
                <div>Current requests</div>
              </div>

              <PatientList patientsRequests={patientsRequests} />
            </div>
            <div
              className="col s12 m5 offset-m1"
              style={{ paddingTop: "1.5%" }}
            >
              <Doctors />
            </div>
          </div>
        </div>
      );
    } else if (!profile.type){
      return <div className="container">
        <div className="card">
          <div className="card-title">Assigned Patient Requests</div>
          <SpecialistsView/>
          
        </div>

      </div>;
    }
    else return <div>Please wait...</div>;
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    patientsRequests: state.firestore.ordered.patientRequests,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "patientRequests", orderBy: ["createdAt", "desc"] },
  ])
)(Dashboard);
