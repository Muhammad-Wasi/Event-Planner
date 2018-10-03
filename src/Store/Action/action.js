import actionType from '../Constant/constant';
// import firebase from 'firebase';

export function changeState(userDataObj) {
    return dispatch => {
        // firebase.database().ref('Events/').on('child_added', snapshot => {
        //     console.log('ActionKey', snapshot.key);
        //     console.log('ActionKey', snapshot.val());
        // })
        dispatch({ type: actionType.userDataObj, payload: { userDataObj } })
    }
}