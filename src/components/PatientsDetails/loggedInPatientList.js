import React from "react";
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import LoggedInPatientSummary from "./loggedInPatientSummary";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const LoggedInPatientList = (props) => {
  const { patientsRequests, auth, profile, userId } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  console.log(profile);
  if (profile.status==="Suspended"){
    return (
    <div className="container " style={{ height: "600px" }}>
        <div className="card" style={{marginTop:"20%"}}>
          <div className="card-content">
           <p>Your account has been suspended due to violation of our policy.</p> 
           
          </div>
          
        </div>
      </div>
    )
  }
  const recordsAsArray = Object.entries(patientsRequests).filter(
    ([key, value]) => value.authorId === userId
  );

  if (recordsAsArray.length===0){
    return (
      <div className="container " style={{ height: "600px" }}>
        <div className="card" style={{marginTop:"20%"}}>
          <div className="card-content">
           <p>You have not placed any request yet</p> 
           <Link to="/create-request" className="btn red waves-effect waves-effect-dark">Create New Request</Link>
          </div>
          
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard container ">
      <div className="row ">
        <div>
        <span className="card-title">Your Requests</span>
          <div
            className="project-list section"
            style={{
              overflowX: "hidden",
              overflowY: "scroll",
              height: "600px",
            }}
          >
            {recordsAsArray.map((onerecord) => {
              let key = onerecord[0];
              let value = onerecord[1];
              return (
                <LoggedInPatientSummary onerecord={value} recordKey={key} />
              );
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
