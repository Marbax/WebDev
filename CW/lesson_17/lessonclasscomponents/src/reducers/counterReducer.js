import { INCREMENT, INCREMENT_MOROZOV } from "../actions/counterActions";


function counterReducer(state = {count: 0}, action) {
    switch (action.type) {
        case INCREMENT:
            return {count: state.count + 1}
        case INCREMENT_MOROZOV:
            return {count: state.count + 2}
        default:
            return {count: 0}
    }
}

export default counterReducer