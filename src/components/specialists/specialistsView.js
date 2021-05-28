import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const SpecialistsView = (props) => {
  const { requests, auth } = props;

  
  return (
    <div>
      {requests.map((request) => {
        return <div key={request.id}>{request.authorFirstName}</div>;
      })}
      <p>Current Requests Here</p>
    </div>
  );
};
const mapStateToProps = (state) => {
  const requests = state.firestore.data.patientRequests;
  console.log(state);
  return {
    requests,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "patientRequests" }])
)(SpecialistsView);
