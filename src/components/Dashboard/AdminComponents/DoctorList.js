import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router";
import { compose } from "redux";
import firebase from "../../../config/fbConfig";
import loading from "../../../icons/loading.png";

const AssignSpecialist = (props) => {
  const { auth, doctors } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
if(!doctors){return(<div className="container center-align">
<img className="image" src={loading} alt="loading icon" />
</div>);}
  const availableSpecialists = Object.entries(doctors)

  const db = firebase.firestore();
  const deleteSpecialist = async (key) => {
    const name="Patient"
   await db.collection("doctors").doc(key).delete((err)=>{
     if (err){
       console.log(err);
     }
   })
    return key;
  };
  const addGP = (key)=>{
db.collection("users").doc(key).update({
  type: "GP",

})
db.collection("doctors").doc(key).update({
  specializationField: "General Physician"
})
  }
  if (availableSpecialists.length === 0) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-title">Available Specialists</div>
          <div className="card-content">
            There are currently no specialists in this area.
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="card">
        <div className="card-title">Available Specialists</div>
        <div className="table">
          <table className="highlighted">
            <thead>
              <tr>
                <th>Name</th>
                <th>Field of Specialization</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="centered">
              {availableSpecialists.map((specialist) => {
                let key = specialist[0];
                let value = specialist[1];
                return (
                  <tr key={key} className="grey-text text-darken-3">
                    <td>
                      {value.firstName} {value.lastName}
                    </td>
                    <td>{value.specializationField}</td>
                    <td>
                      <button
                        className="btn red waves-effect waves-effect-darken"
                        onClick={() => deleteSpecialist(key)}
                      >
                        Remove
                      </button>
                      <button
                        className="btn red waves-effect waves-effect-darken"
                        onClick={() => addGP(key)}
                      >
                        Make GP
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const doctors = state.firestore.data.doctors;
  return {
    doctors,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "doctors" }])
)(AssignSpecialist);
