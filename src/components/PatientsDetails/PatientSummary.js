import React from "react";
import moment from 'moment';


const PatientSummary = ({patientRequest}) => {
  const dateAndTime=moment(patientRequest.createdAt.toDate()).calendar();
  const contentSnippet= patientRequest.content.substring(0,50);
  return (
    <div className="card z-depth-0 project-summary">
      <span className="card-title">{patientRequest.specializationField}</span>
      <div className="card-content grey-text text-darken-3">
        <p>{contentSnippet}...</p>
        <p className="grey-text text-darken-1">{dateAndTime} </p>
        <p className="grey-text text-darken-1">Status: {patientRequest.status}</p>
        
      </div>
    </div>
  );
};

export default PatientSummary;
