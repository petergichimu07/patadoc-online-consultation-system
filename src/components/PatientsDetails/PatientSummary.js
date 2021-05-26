import React from "react";
import moment from 'moment';


const PatientSummary = ({patientRequest}) => {
  const dateAndTime=moment(patientRequest.createdAt.toDate()).calendar();
  return (
    <div className="card z-depth-0 project-summary">
      <span className="card-title">{patientRequest.specializationField}</span>
      <div className="card-content grey-text text-darken-3">
        <p>Posted By: {patientRequest.authorFirstName} {patientRequest.authorLastName} </p>
        <p className="grey-text">{dateAndTime} </p>
        
      </div>
    </div>
  );
};

export default PatientSummary;
