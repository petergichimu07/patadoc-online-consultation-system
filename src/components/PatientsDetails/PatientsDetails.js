import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";


const PatientsDetails = (props) => {
  const { onerequest, auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;

  const reply = () => {
    const name = "Specialist";
    const room = props.match.params.id;
    window.location.href = `/chat?name=${name}&room=${room}`;
  };
  

  
  const themoment = moment(onerequest.createdAt.toDate()).calendar();
  if (onerequest) {
    return (
      <div>
        <div className="container section project-details z-depth-5">
          <div className="card z-depth-0">
            <div className="card-content">
              <div className="left-align card-action  grey-text">
                <div>Category:{onerequest.specializationField}</div>
                <div>Time Posted: {themoment}</div>
                <div>Status:{onerequest.status}</div>
              </div>
              <span className="card-title blue-text">{onerequest.title}</span>
              
              <p>{onerequest.content}</p>
            </div>
            <div className="right-align" style={{ padding: "5%" }}>
              <button
                className="btn red lighten-1 waves-effect waves-dark z-depth-0"
                onClick={reply}
              >
                Reply
              </button>
              
              <Link
                to={"/assign/" + props.match.params.id+"/"+ onerequest.specializationField }
                category={onerequest.specializationField}
                id={props.match.params.id}
                className="btn red lighten-1 waves-effect waves-dark z-depth-0"
                style={{ marginLeft: "15px" }}
              >
                Assign to Specialist
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading Requests...</p>
      </div>
    );
  }
};
const mapStateToProps = (state, ownProps) => {
  // selecting one request from the database
  const id = ownProps.match.params.id;
  const requests = state.firestore.data.patientRequests;
  const onerequest = requests ? requests[id] : null;
  return {
    onerequest: onerequest,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "patientRequests" }])
)(PatientsDetails);
