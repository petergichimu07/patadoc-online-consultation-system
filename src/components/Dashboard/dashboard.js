import React, { Component } from "react";
import Doctors from "./Doctors";
import PatientList from "../PatientsDetails/PatientsList";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import LoggedInPatientList from "../PatientsDetails/loggedInPatientList";
import SpecialistsView from "../specialists/specialistsView";
import Admin from "./Admin";
import loadingIcon from "../../icons/loadingIcon.png";
class Dashboard extends Component {
  render() {
    const { patientsRequests, auth, profile } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    } else if (profile.type === "patient") {
      return (
        <div>
          <LoggedInPatientList />
        </div>
      );
    } else if (profile.type === "GP") {
      if (!patientsRequests) {
        return <div>Loading Requests...</div>;
      }
      return (
        <div className="dashboard container ">
          <div className="row ">
            <div className="">
              <div className="z-index-0 ">
                <h5 className="blue-text" style={{}}>
                  Current requests
                </h5>
              </div>
              <PatientList patientsRequests={patientsRequests} />
            </div>
            {/* <div
              className="col s12 m5 offset-m1"
              style={{ paddingTop: "1.5%" }}
            >
              <Doctors />
            </div> */}
          </div>
        </div>
      );
    } else if (profile.type === "specialist") {
      return (
        <div className="container">
          <SpecialistsView />
        </div>
      );
    } else if (profile.type === "admin") {
      return (
        <div>
          <Admin />{" "}
        </div>
      );
    } else
      return (
        <div className="container center-align">
          <img className="image" src={loadingIcon} alt="loading icon" />
        </div>
      );
  }
}

const mapStateToProps = (state) => {
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
