import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUpDoctors, signUp } from "../../store/actions/authAction";

class signupDoctors extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    specializationField: "",
    type: "specialist",
    status:"Free"
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUpDoctors(this.state);
  }
  
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="row" >
        <div className="card offset-m4 z-depth-4 col s12 m4"  >
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create a Doctor Account</h5>
          {/* <div className="input-field">
              <label htmlFor="kmpduNumber">KMPDU Registration Number</label>
              <input
                type="text"
                id="kmpduNumber"
                onChange={this.handleChange}
                required
              />
               <button className="btn grey lighten-2 waves-effect waves-dark z-depth-0" onClick={this.verifyRegistration}>
              Verify
            </button> 
            </div> */}
          <div className="input-field">
            <label htmlFor="lastName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange} required />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} required />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} required />
          </div>
          <div className="input-field">
            <label htmlFor="password">Create Your Password</label>
            <input type="password" id="password" onChange={this.handleChange} required/>
          </div>
          <p className="left-align">Field of Specialization</p>
          <select
            className="dropdown  btn"
            id="specializationField"
            onChange={this.handleChange}
            required
          ><option>Select Catogory</option>
            <option value="Dental health">Dental Health</option>
            <option value="Psychiatry">Psychiatry</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Gaenacology">Gaenacology</option>
            <option value="Oncology">Oncology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Paediatrics">Paediatrics</option>

          </select>

          <div className="input-field">
            <button className="btn red lighten-1 waves-effect waves-dark z-depth-0">
              Sign Up
            </button>
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
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
    signUpDoctors: (newUser) => dispatch(signUpDoctors(newUser)),
    signUp: (newUser)=> dispatch(signUp(newUser))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(signupDoctors);
