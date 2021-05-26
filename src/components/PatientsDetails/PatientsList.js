import React from "react";
import PatientSummary from "./PatientSummary";
import { Link } from "react-router-dom";

const PatientList = ({ patientsRequests }) => {
  return (
    
    <div className="project-list section" style={{overflowX:"hidden", overflowY:"scroll",height:"600px"}}>
      
      {patientsRequests &&
        patientsRequests.map((patientRequest) => {
          return (
            <Link to={'/patients/'+ patientRequest.id}>
              <PatientSummary
                patientRequest={patientRequest}
                key={patientRequest.id}
              />
            </Link>
          );
        })}
    </div>
  );
};
export default PatientList;
