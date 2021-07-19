import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authAction";
import { Profiler } from "react";
// these are the links that will be displayed whe the user is logged in
const SignedInLinks = (props) => {
  // console.log(props.profile.initials);
  if (props.profile.type === "patient") {
    return (
      <div className="right">
        <ul>
          <li>
            <Link to="/create-request">Create New Request</Link>
          </li>
          
          <li>
            <a onClick={props.signOut}>Log Out</a>
          </li>

          <li>
            <Link
              to="/"
              className="btn-floating btn-large waves-effect waves-dark red"
            >
              {props.profile.initials}
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div className="right">
      <ul>
        <li>
         
        </li>
        <li>
          <a onClick={props.signOut}>Log Out</a>
        </li>

        <li>
          <Link
            to="/"
            className="btn-floating btn-large waves-effect waves-dark red"
          >
            SP
          </Link>
        </li>
      </ul>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};
export default connect(null, mapDispatchToProps)(SignedInLinks);
