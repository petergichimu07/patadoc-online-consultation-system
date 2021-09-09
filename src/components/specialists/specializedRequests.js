import React,{useState} from "react";
import DateTimePicker from 'react-datetime-picker';
import moment from "moment";
import firebase from "./../../config/fbConfig";
const SpecializedRequests = ({ onerecord, recordKey }) => {
  const db = firebase.firestore();
  const [thetime, settheTime] = useState(new Date());
  const schedule = () => {
    const name = "Specialist";
    
      db.collection("chats").add({
        room: recordKey,
      });
    window.location.href = `/chat?name=${name}&room=${recordKey}`;
  };
  const endConsultation =()=> {
    db.collection("patientRequests").doc(recordKey).update({
      status: "complete"
    })
  }
  return (
    <div className="card z-depth-2 grey lighten-4 project-summary">
      <div className="whitooe">
        <p className=" card-title left-align" style={{ padding: "10px" }}>
          Category: {onerecord.specializationField}
        </p>
        <div className="card-content grey-text text-darken-3">
          <p>{onerecord.content} </p>
        </div>
        <div
          className=" grey-text text-darken-2 right-align"
          style={{ padding: "10px" }}
        >
          <p>Posted: {moment(onerecord.createdAt.toDate()).calendar()}</p>
          {/* <p>Status: {onerecord.status}</p> */}
          <button
            className="btn red darken-2 waves-effect waves-dark z-depth-0"
            onClick={schedule}
          >
            Contact
          </button>
          <button className="btn red darken-2 waves-effect waves-dark z-depth-0"
            onClick={endConsultation}>End Consultation</button>
        </div>
      </div>
    </div>
  );
};

export default SpecializedRequests;
