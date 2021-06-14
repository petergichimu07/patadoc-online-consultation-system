import React from "react";
import moment from "moment";

const SpecializedRequests = ({ onerecord, recordKey }) => {
  const reply = () => {
    const name = "Specialist";
    window.location.href = `/chat?name=${name}&room=${recordKey}`;
  };
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
            onClick={reply}
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecializedRequests;
