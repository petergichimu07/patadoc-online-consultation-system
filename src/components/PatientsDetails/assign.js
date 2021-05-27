import React from 'react'
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const AssignSpecialist =( props)=> {
    const { specialists, auth } = props;
    const id=props.match.params.id
    const category= props.match.params.category

    console.log(specialists);
    
        return (
            <div className="container">
                <div className="card">Available Specialists</div>
                
            </div>
        )
    
}
const mapStateToProps = (state, ownProps) => {
    // selecting one request from the database
    const category = ownProps.match.params.category;
    const requests = state.firestore.data.doctors;
    const specialists = requests ? requests[category] : null;
    return {
      specialists,
      auth: state.firebase.auth,
      profile: state.firebase.profile,
    };
  };
  export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: "doctors" }])
  )(AssignSpecialist)
