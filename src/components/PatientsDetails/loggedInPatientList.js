import React from "react";
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import LoggedInPatientSummary from "./loggedInPatientSummary";
import { Redirect } from "react-router";


const LoggedInPatientList = (props) => {
  const { patientsRequests, auth, profile, userId } = props;
  if (!auth.uid) return <Redirect to="/signin" />;

  const recordsAsArray  = Object.entries(patientsRequests).filter(([key, value])=>value.authorId=== userId);

  return (
    <div className="dashboard container ">
      <div className="row ">
        <div>
          <div className="project-list section" style={{overflowX:"hidden", overflowY:"scroll",height:"600px"}}>
            {recordsAsArray.map((onerecord) => {
              let key  = onerecord[0];
              let value  = onerecord[1];
              return(<LoggedInPatientSummary onerecord={value} recordKey={key} />)
})}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const userId = state.firebase.auth.uid;
  const requests = state.firestore.data.patientRequests;

  return {
    patientsRequests: requests,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    userId,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "patientRequests", orderBy: ["createdAt", "desc"] },
  ])
)(LoggedInPatientList);
