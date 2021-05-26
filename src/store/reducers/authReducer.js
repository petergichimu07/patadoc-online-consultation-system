const initState = {};
const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'LOGIN_ERROR':
      return{
        ...state,
        
        authError: action.err.message
      }
    case 'LOGIN_SUCCESS':
      console.log('login successful');
      return{
        ...state,
        authError: null
      }
    case 'SIGNOUT_SUCCESS':
      console.log('signed out successfully');
      return state;
    case 'SIGNUP_SUCCESS':
      console.log('Signed up successfully');
      return {
        ...state,
        authError:null}
    case 'SIGNUP_ERROR':
      console.log('Error signing up');
      return{
        ...state,
        authError: action.err.message
      }
    default:
      return state;
  }
  
};
export default authReducer;
