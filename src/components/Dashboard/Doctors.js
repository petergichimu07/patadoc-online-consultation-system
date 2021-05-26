import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
class Doctors extends Component {
  render() {
    const { users, auth } = this.props;
    const user = 
    console.log(users);
    if (!auth.uid) return <Redirect to="/signin" />;
    if (users) {
      return (
        <div className="row  ">
          <div className="card z-depth-2 project-summary">
            <span className="card-title blue-text">Registered Doctors</span>

            <table className="highlighted">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specialization Field</th>
                </tr>
              </thead>
              <tbody className="centered">
                
                {users.map((user) => (
                  <tr key={user.id} className="grey-text text-darken-3">
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.specializationField} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return <div>Loading Doctors... </div>;
    }
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    users: state.firestore.ordered.doctors,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "doctors" }])
)(Doctors);
