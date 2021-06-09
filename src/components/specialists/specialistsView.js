import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import SpecializedRequests from "./specializedRequests";

const SpecialistsView = (props) => {
  const { requests, auth } = props;
  if (!requests){
    return(
      <div>
        Checking Requests...
      </div>
    )
  }
  console.log(requests);
  const specializedRequests = Object.entries(requests).filter(
    ([key, value]) => value.engagedTo === auth.uid
  );
  console.log("Requests", requests);
  console.log("UID: ",auth.uid)
  if (specializedRequests.length===0){
    return (
      <div className="container " style={{ height: "600px" }}>
        <div className="card" style={{marginTop:"20%"}}>
          <div className="card-content">
           <p>There are no placed requests for you yet</p> 
           
          </div>
          
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {specializedRequests.map((onerequest) => {
              let key = onerequest[0];
              let value = onerequest[1];
              return (
                <SpecializedRequests onerecord={value} recordKey={key}/>
              );
            })}
      
    </div>
  );
};
const mapStateToProps = (state) => {
  const requests = state.firestore.data.patientRequests;
  console.log(state);
  return {
    
    requests:requests,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "patientRequests" }])
)(SpecialistsView);
