import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authAction";
import { signupDoctors } from "../Auth/signupDoctors";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    type: "patient",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  };
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="row">
        <div className="card offset-m4 z-depth-4 col s12 m4"style={{marginTop:"1%"}} >
          <div className="">
            <form onSubmit={this.handleSubmit} className="white">
              <h5 className="grey-text text-darken-3">Sign Up</h5>
              <div className="input-field">
                <label htmlFor="lastName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="input-field">
                <button className="btn red lighten-1 waves-effect waves-dark z-depth-0">
                  Sign Up
                </button>
                <div className="red-text center">
                  {authError ? <p>{authError}</p> : null}
                </div>
                {/* <p>Are you a specialist? Create Account</p><a href="/signup-doctor"> here.</a> */}
                <Link to="/signup-doctor" className="blue-text text-darken-1">
                  I am a specialist
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
