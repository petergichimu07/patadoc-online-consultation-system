const initState = {
  patients: [{ id: "", tittle: "", content: "" }],
  loadingReq: false
};

const patientReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_REQUEST_LOAD":
      console.log("request created", action.request);
      return {...state, loadingReq: true};
      case "CREATE_REQUEST":
        console.log("request created", action.request);
        return {...state, loadingReq: false};

    case "CREATE_REQUEST_ERROR":
      console.log("Error creating request:", action.err);
      return state;
    default:
      return state;
  }
};
export default patientReducer;
