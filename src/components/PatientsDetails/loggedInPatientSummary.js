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
      "Your Condition has been reviewed and there is nothing to worry about. There is no reason to worry";
  } else if (onerecord.gpReview === "critical") {
    message = "You need to seek further medical consultation.";
  }
  if (onerecord.status === "pending") {
    statusBg = "orange";
  }
  if (onerecord.status === "Solved") {
    statusBg = "green";
  }
  if (onerecord.status === "referred") {
    statusBg = "red";
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
            width: "",
            marginRight: "5px",
            textTransform: "uppercase",
            fontWeight: "bold",
            display: "flex"
          }}
        ><p className="grey-text text-darken-3">Status: </p>
          <p className={statusBg} style={{padding:"0px 8px"}}>
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
          <button
            className="btn red lighten-2 waves-effect waves-dark z-depth-0"
            onClick={reply}
          >
            Check Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoggedInPatientSummary;
