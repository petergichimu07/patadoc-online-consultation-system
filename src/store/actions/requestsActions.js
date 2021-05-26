export const createRequest = (request) => {
  return (dispatch, getState,{getFirebase,getFirestore}) => {
    const firestore=getFirestore();
    const profile = getState().firebase.profile;
    const authorId= getState().firebase.auth.uid;
    firestore.collection('patientRequests').add({
      ...request,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date(),
      
    }).then(()=>{
      dispatch({type: 'CREATE_REQUEST',request})
    }).catch((err)=>{
      dispatch({type:'CREATE_REQUEST_ERROR',err})
    })
      
  };
};
