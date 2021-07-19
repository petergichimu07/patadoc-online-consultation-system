import React from "react";
import moment from "moment";

const PatientSummary = ({ patientRequest }) => {
  let statusBg;
  if (patientRequest.status === "pending") {
    statusBg = "orange";
  }
  if (patientRequest.status === "Solved") {
    statusBg = "green";
  }
  if (patientRequest.status === "referred") {
    statusBg = "red";
  }
  if (patientRequest.status === "consulting") {
    statusBg = "blue";
  }
  const dateAndTime = moment(patientRequest.createdAt.toDate()).calendar();
  const contentSnippet = patientRequest.content.substring(0, 50);
  return (
    <div className="card z-depth-2 project-summary" style={{ height: "200px",position:"relative" }}>
      <div
        className="right white-text"
        style={{
          marginTop: "10px",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        <p className={statusBg} style={{ padding: "0px 8px" }}>
          {patientRequest.status}
        </p>
      </div>
      <div className="card-content" style={{}}
      style={{
        position:"absolute",
        top: "30px",
        left:"5px",
        fontSize: "15px",
        fontWeight: "bold"

      }}>
        {patientRequest.title}
      </div>
      <div className="card-content left-align patadocpatadoc
      grey-text text-darken-3"
      style={{
        paddingTop:"",
        position:"absolute",
        top:"70px",
        left:"2px"
      }}>
        <p>{contentSnippet}...</p>
      </div>
      <p
        className="grey-text text-darken-1 right-align"
        style={{
          fontSize: "12px",
          position: "absolute",
          bottom:"2px",
          right:"2px",
          fontWeight:"bold"
          
        }}
      >
        {dateAndTime}{" "}
      </p>
    </div>
  );
};

export default PatientSummary;
