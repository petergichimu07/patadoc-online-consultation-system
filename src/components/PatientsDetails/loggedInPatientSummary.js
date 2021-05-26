import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
// import PatientList from "./PatientsList";

const LoggedInPatientSummary = ({ onerecord, recordKey }) => {
  const reply =() => {
    const name = "Patient";
    window.location.href = `/chat?name=${name}&room=${recordKey}`

}
if (!onerecord){
  return(
    <div className="card z-index-2" style={{paddingTop:"100px"}}>
      <div className="card-content flow-text">You have not Posted any request yet </div>
      <Link to="/createRequest">Create New Request</Link>

    </div>
  )
}
  return (
    <div className="card z-depth-2 grey lighten-4 project-summary" >
      <div className="whitooe" >
        <p className=" card-title left-align" style={{padding:"10px"}}>
          Category: {onerecord.specializationField}
        </p>
        <div className="card-content grey-text text-darken-3">
          <p>{onerecord.content} </p>
        </div>
        <div className=" grey-text text-darken-2 right-align" style={{padding:"10px"}}>
          <p>{moment(onerecord.createdAt.toDate()).calendar()}</p>
          <p>Status: {onerecord.status}</p>
          <button className="btn red lighten-2 waves-effect waves-dark z-depth-0" onClick={reply}>Check Reply</button>
          
        </div>
      </div>
    </div>
  );
};

export default LoggedInPatientSummary;
