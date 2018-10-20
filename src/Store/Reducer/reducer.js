import actionType from '../Constant/constant';

const initialState = {
    user: {},
    currentuserUID: '',
    events: [],
    eventKey: '',
    going: [],
    notgoing: [],
    condition: true
}

export default (states = initialState, action) => {
    switch (action.type) {
        case actionType.CURRENTUSER:
            return ({
                ...states,
                user: action.payload
            })
            case actionType.CURRENTUSERUID:
            return ({
                ...states,
                currentuserUID: action.payload
            })
            case actionType.EVENTS:
            return ({
                ...states,
                events: action.payload
            })
            case actionType.EVENTKEY:
            return ({
                ...states,
                eventKey: action.payload
            })
            case actionType.GOINGKEY:
            return ({
                ...states,
                going: action.payload
            })
            case actionType.NOTGOINGKEY:
            return ({
                ...states,
                notgoing: action.payload
            })
            case actionType.CHANGES:
            return ({
                ...states,
                condition: action.payload
            })
        default:
            return states;
    }
}