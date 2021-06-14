import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/Dashboard/dashboard";
import PatientsDetails from "./components/PatientsDetails/PatientsDetails";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import createRequest from "./components/PatientsDetails/CreateRequest";
import PatientList from "./components/PatientsDetails/PatientsList";
import signupDoctors from "./components/Auth/signupDoctors";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import { useSelector } from "react-redux";
import AssignSpecialist from "./components/PatientsDetails/assign";
import loadingIcon from "../src/icons/loadingIcon.png";

function App() {
  const auth = useSelector((state) => state.firebase.auth);

  if (auth.isLoaded === false)
    return (
      <div className="container center-align">
        <img className="image" src={loadingIcon} alt="loading icon" />
      </div>
    );

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div
          style={{
            marginTop: "70px",
          }}
        >
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/patients/:id" component={PatientsDetails} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/create-request" component={createRequest} />
            <Route path="/patient-list" component={PatientList} />
            <Route path="/signup-doctor" component={signupDoctors} />
            <Route path="/join" exact component={Join} />
            <Route path="/chat" component={Chat} />
            <Route path="/assign/:id/:category" component={AssignSpecialist} />
            <Route
              component={() => (
                <div className="card">
                  <div className="card-title">Error 404</div>
                  <div className="card-content">Sorry, Page Not Found</div>
                </div>
              )}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
