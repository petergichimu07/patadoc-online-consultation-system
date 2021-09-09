import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
// import PatientList from "./PatientsList";

const LoggedInPatientSummary = ({ onerecord, recordKey }) => {
  let message = "";
  let statusBg = "";
  const reply = () => {
    const name = "Patient";

    window.location.href = `/chat?name=${name}&room=${recordKey}`;
  };
  if (onerecord.gpReview === "ok") {
    message =
      "Your Condition has been reviewed and you are experiencing normal signs of recovery. There is no reason to worry";
  } else if (onerecord.gpReview === "critical") {
    message = "You need to seek further medical consultation.";
  } else {
    message =
      "Please wait for the General Physician to review your request. Thank you.";
  }
  if (onerecord.status === "pending") {
    statusBg = "orange";
  }
  if (onerecord.status === "Solved" || onerecord.status==="complete") {
    statusBg = "green";
  }
  if (onerecord.status === "referred") {
    statusBg = "red";
  }
  if (onerecord.status === "consulting") {
    statusBg = "blue";
  }
  if (!onerecord) {
    return (
      <div className="card z-index-2" style={{ paddingTop: "100px" }}>
        <div className="card-content flow-text">
          You have not Posted any request yet{" "}
        </div>
        <Link to="/createRequest">Create New Request</Link>
      </div>
    );
  }

  return (
    <div className="card z-depth-2 grey lighten-4 project-summary">
      <div className="whitooe">
        <div
          className=" grey-text text-darken-2 left-align"
          style={{ padding: "20px" }}
        >
          <p>Posted:{moment(onerecord.createdAt.toDate()).calendar()}</p>
          <p>Category: {onerecord.specializationField}</p>
        </div>
        <div
          className="right white-text center-align"
          style={{
            marginRight: "5px",
            textTransform: "uppercase",
            fontWeight: "bold",
            display: "flex",
          }}
        >
          <p className="grey-text text-darken-3">Status: </p>
          <p className={statusBg} style={{ padding: "0px 8px" }}>
            {onerecord.status}
          </p>
        </div>
        <p className=" card-title left-align" style={{ padding: "10px" }}>
          Condition: {onerecord.title}
        </p>
        <div className="card-content grey-text text-darken-3">
          <p>Your Condition: {onerecord.content} </p>
        </div>
        <div
          className=" container card card-content blue white-text "
          style={{ margin: "20px" }}
        >
          <p style={{ fontWeight: "bolder" }}>Physician's Review</p>
          <p>{message}</p>
        </div>
        <div
          className=" grey-text text-darken-2 right-align"
          style={{ padding: "10px" }}
        >
          <div>
            {onerecord.status === "consulting" ? (
              <button
                className="btn red lighten-1 waves-effect waves-dark z-depth-0"
                onClick={reply}
              >
                Check Reply
              </button>
            ) : null}
          </div>
          <div>
            {onerecord.status === "referred" ? (
              <Link
                to={
                  "/assign/" + recordKey + "/" + onerecord.specializationField
                }
                category={onerecord.specializationField}
                id={recordKey}
                className="btn red lighten-1 waves-effect waves-dark z-depth-0"
                style={{ marginLeft: "15px" }}
              >
                Consult Specialist
              </Link>
            ) : null}
          </div>
          {onerecord.status==="complete"?   <Link
                to={
                  "/feedback/" + recordKey + "/" + onerecord.specializationField
                }
                category={onerecord.specializationField}
                id={recordKey}
                className="btn red lighten-1 waves-effect waves-dark z-depth-0"
                style={{ marginLeft: "15px" }}
              >
                Give feedback
              </Link>:
          null}
        </div>
      </div>
    </div>
  );
};

export default LoggedInPatientSummary;
