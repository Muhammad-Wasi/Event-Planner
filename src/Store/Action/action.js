import actionType from '../Constant/constant';

export function changeState(userDataObj) {
    return dispatch => {
        dispatch({ type: actionType.userDataObj, payload: { userDataObj } })
    }
}