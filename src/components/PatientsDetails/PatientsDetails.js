import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import firebase from "./../../config/fbConfig";

const PatientsDetails = (props) => {
  const { onerequest, auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  const requestId = props.match.params.id;
  const db = firebase.firestore();
  const confirmPrescription = () => {
    db.collection("patientRequests").doc(requestId).update({
      gpReview: "ok",
      status: "Solved",
    });
  };
  const recommend = () => {
    db.collection("patientRequests").doc(requestId).update({
      gpReview: "critical",
      status: "referred",
    });
  };
  //  const deleteRecord=()=>{
  //   db.collection("patientRequests").doc(requestId).delete().await()
  //   props.history.push("/");

  //  }
  const themoment = moment(onerequest.createdAt.toDate()).calendar();
  let statusBg;
  if (onerequest.status === "pending") {
    statusBg = "orange";
  }
  if (onerequest.status === "Solved") {
    statusBg = "green";
  }
  if (onerequest.status === "referred") {
    statusBg = "red";
  }
  if (onerequest.status === "consulting") {
    statusBg = "blue";
  }
  if (onerequest) {
    return (
      <div>
        <div className="container section project-details z-depth-5">
          <div className="card z-depth-0">
            <div className="card-content">
              <div className="left-align card-action  grey-text">
                <div>Category:{onerequest.specializationField}</div>
                <div>Time Posted: {themoment}</div>
                <div>Previous diagnosis: {onerequest.title}</div>
              </div>
              <div
                className="right"
                style={{ textTransform: "uppercase", fontWeight: "bold",display:"flex" }}
              ><p className="grey-text text-darken-2">Status:</p>
                <p className={statusBg} style={{color:"#FFF",padding:"0px 5px"}}>{onerequest.status}</p>
              </div>
              <span className="card-title blue-text">Description</span>
              <div className="left-align">
                <div className="hoverable grey lighten-5 ">
                  <p
                    className="blue-text text-darken-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Previous Condition{" "}
                  </p>
                  <p>{onerequest.content}</p>
                </div>
                <div className="divider "></div>
                <div className="hoverable grey lighten-5 ">
                  <p
                    className="blue-text text-darken-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Prescription Given
                  </p>
                  <p>{onerequest.prescription}</p>
                </div>

                <div className="divider"></div>
                <div className="hoverable grey lighten-5">
                  <p
                    className="blue-text text-darken-2"
                    style={{ fontWeight: "bolder" }}
                  >
                    Current Condition{" "}
                  </p>
                  <p>{onerequest.currentfeeling}</p>
                </div>
              </div>
            </div>
            <div className="right-align" style={{ padding: "5%" }}>
              <button
                className="btn red lighten-1 waves-effect waves-dark z-depth-0"
                onClick={confirmPrescription}
              >
                Correct Diagnosis and prescription
              </button>

              
              <btn
                className="btn red lighten-1 waves-effect waves-dark z-depth-0"
                style={{ marginLeft: "15px" }}
                onClick={recommend}
              >
                Further consultation needed
              </btn>
              {/* <button onClick={deleteRecord}>Delete</button> */}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading Requests...</p>
      </div>
    );
  }
};
const mapStateToProps = (state, ownProps) => {
  // selecting one request from the database
  const id = ownProps.match.params.id;
  const requests = state.firestore.data.patientRequests;
  const onerequest = requests ? requests[id] : null;
  return {
    onerequest: onerequest,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "patientRequests" }])
)(PatientsDetails);
