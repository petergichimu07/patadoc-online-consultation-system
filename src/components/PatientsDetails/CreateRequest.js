import React, { Component } from "react";
import { createRequest } from "../../store/actions/requestsActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class makeRequest extends Component {
  state = {
    title: "",
    specializationField: "",
    content: "",
    prescription:"",
    currentfeeling:"",
    status: "pending"
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.createRequest(this.state);
    // redirect the patient to the homepage
    this.props.history.push("/");
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container z-depth-5">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="blue-text text-darken-1">Lets Get You Well!</h5>
          <div>
            <p className="left-align grey-text text-darken-2">
            Choose a Category that best describes your condition
              
            </p>
            <select
              className="dropdown btn grey lighten-3 grey-text text-darken-4"
              id="specializationField"
              
              onChange={this.handleChange}
              required
            >
              <option>Category</option>
              <option value="Dental Health" className="dropdown-content">Dental Health</option>
              <option value="Psychiatry">Brain Health</option>
              <option value="Dermatology">Skin related</option>
              <option value="Gaenacology">Reproductive Health</option>
              <option value="Oncology">Cancer</option>
              <option value="Orthopedic">Bone Diseases</option>
              <option value="Paediatrics">Child Diseases</option>
              
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="title">Name of earlier diagnosed disease</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
         
          <div className="input-field">
            <label htmlFor="content">Describe your condition before visiting the hospital</label>
            <textarea
              id="content"
              className="materialize-textarea"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="prescription">Describe the prescription given</label>
            <textarea
              id="prescription"
              className="materialize-textarea"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="currentfeeling">Describe how you are feeling after the prescription</label>
            <textarea
              id="currentfeeling"
              className="materialize-textarea"
              onChange={this.handleChange}
              required
            />
          </div>
          {/* <input type='file'/> */}
          <div className="input-field">
            <button className="btn red lighten-1 z-depth-0  waves-effect waves-dark red">
              Create Request
            </button>
          </div>
          
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createRequest: (makerequest) => {
      return dispatch(createRequest(makerequest));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(makeRequest);
