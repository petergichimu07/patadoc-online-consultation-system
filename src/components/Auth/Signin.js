import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authAction";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class Signin extends Component {
  state = {
    email: "",
    password: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="container">
      <div className="row">
        <div className="card offset-m4 z-depth-4 col s12 m5" style={{marginTop:"10%"}}>
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Sign In</h5>
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
                Login
              </button>
              <div className="red-text center ">
                {authError ? <p>{authError}</p> : null}
              </div>
              <Link to="/signup" className="blue-text text-darken-1">
                  I don't have an account
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
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
