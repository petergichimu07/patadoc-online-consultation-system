import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore, createFirestoreInstance } from "redux-firestore";
import { getFirebase, ReactReduxFirebaseProvider, createFirebaseInstance,isLoaded } from "react-redux-firebase";
import  fbConfig  from "./config/fbConfig";
import firebase from "./config/fbConfig";



const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, fbConfig)
    
  )
);
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  
}
const rrfProps = {
  firebase,
  config:rrfConfig, fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  
  
  
  }
function AuthIsLoaded({children}){
   const auth = useSelector(state => state.firebase.auth);
   
   if(!isLoaded)
      return(
        <div className="center">Loading...</div>
      );
    return children;
}

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
       <AuthIsLoaded>
        <App />
        </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
