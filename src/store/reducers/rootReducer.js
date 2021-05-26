import authReducer from "./authReducer";
import patientReducer from "./patientsReducer";
import { combineReducers } from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";


const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  patient: patientReducer,
});
export default rootReducer;
