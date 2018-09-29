import actionType from '../Constant/constant';

const initialState = {
    name: "",
    email: "",
    photo: "",
    userUID: ""
}

export default (states = initialState, action) => {
    switch (action.type) {
        case actionType.userDataObj:
            return ({
                ...states,
                name: action.payload.name,
                email: action.payload.email,
                photo: action.payload.photo,
                userUID: action.payload.userUID
            })
        default:
            return states;
    }
}