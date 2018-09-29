import actionType from '../Constant/constant';

const initialState = {
    userName: 'Khalid Ayub',
    email: 'Khalid@gmail.com',
    age: 24,
}

export default (states = initialState, action) => {
    switch (action.type) {
        case actionType.ChangeUserName:
            return ({
                ...states,
                userName: action.payload.name,
                email: action.payload.email,
                age: action.payload.age,
            })
        default:
            return states;
    }
}