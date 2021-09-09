import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import SpecializedRequests from "./specializedRequests";

const SpecialistsView = (props) => {
  const { requests, auth, profile } = props;
  if (profile.status==="Suspended"){
    return (
      <div className="container " style={{ height: "600px" }}>
        <div className="card" style={{ marginTop: "20%" }}>
          <div className="card-content">
            <p>Your Account has been suspended due to violation of our policy.</p>
          </div>
        </div>
      </div>
    );
  
  }
  if (!requests) {
    return <div>Checking Requests...</div>;
  }
  
  const specializedRequests = Object.entries(requests).filter(
    ([key, value]) => value.engagedTo === auth.uid
  );
 
  
  if (specializedRequests.length === 0) {
    return (
      <div className="container " style={{ height: "600px" }}>
        <div className="card" style={{ marginTop: "20%" }}>
          <div className="card-content">
            <p>There are no placed requests for you yet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <div className="card-title">Current Requests</div>
      {specializedRequests.map((onerequest) => {
        let key = onerequest[0];
        let value = onerequest[1];
        return <SpecializedRequests onerecord={value} recordKey={key} />;
      })}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  const requests = state.firestore.data.patientRequests;
  console.log(state);
  return {
    requests: requests,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "patientRequests" }])
)(SpecialistsView);
