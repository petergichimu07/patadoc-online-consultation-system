import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router";
import { compose } from "redux";
import firebase from "./../../config/fbConfig";
import loading from "../../icons/loading.png";

const AssignSpecialist = (props) => {
  const { auth, doctors } = props;
  if (!auth.uid) return <Redirect to="/signin" />;

  const requestId = props.match.params.id;
  const category = props.match.params.category;
if(!doctors){return(<div className="container center-align">
<img className="image" src={loading} alt="loading icon" />
</div>);}
  const availableSpecialists = Object.entries(doctors).filter(
    ([key, value]) => value.specializationField === category && value.status !="Suspended"
  );
  const engage = (key) => {
    const db = firebase.firestore();
    const name="Patient"
    db.collection("doctors").doc(key).update({
      status: "engaged",
      
    });
    db.collection("patientRequests").doc(requestId).update({
      status: "consulting",
      engagedTo: key
    })
    // .then(window.location.href = `/chat?name=${name}&room=${requestId}`)
  };
  if (availableSpecialists.length === 0) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-title">Available {category} Specialists</div>
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
        <div className="card-title">Available {category} Specialists</div>
        <div className="table">
          <table className="highlighted">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Engage</th>
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
                    <td>{value.status}</td>
                    <td>
                      <button
                        className="btn red waves-effect waves-effect-darken"
                        onClick={() => engage(key)}
                      >
                        Consult
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
