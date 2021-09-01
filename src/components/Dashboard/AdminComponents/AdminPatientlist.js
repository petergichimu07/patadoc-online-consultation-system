import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router";
import { compose } from "redux";
import firebase from "../../../config/fbConfig";
import loading from "../../../icons/loading.png";

const AssignSpecialist = (props) => {
  const { auth, users } = props;
  if (!auth.uid) return <Redirect to="/signin" />;


if(!users){return(<div className="container center-align">
<img className="image" src={loading} alt="loading icon" />
</div>);}
  const availableSpecialists = Object.entries(users).filter(
    ([key, value]) => value.type === "patient"
  );
  const engage = (key) => {
    const db = firebase.firestore();
    const name="Patient"
    db.collection("doctors").doc(key).update({
      status: "engaged",
      
    });
    // db.collection("patientRequests").doc(requestId).update({
    //   status: "consulting",
    //   engagedTo: key
    // })
    // .then(window.location.href = `/chat?name=${name}&room=${requestId}`)
  };
  if (availableSpecialists.length === 0) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-title">Registered Users</div>
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
        <div className="card-title">Registered Users</div>
        <div className="table">
          <table className="highlighted">
            <thead>
              <tr>
                <th>Name</th>
                <th>Another Column</th>
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
                    <td>another column</td>
                    <td>
                      <button
                        className="btn red waves-effect waves-effect-darken"
                        onClick={() => engage(key)}
                      >
                        Remove User
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
  const users = state.firestore.data.users;
  return {
    users,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }])
)(AssignSpecialist);
