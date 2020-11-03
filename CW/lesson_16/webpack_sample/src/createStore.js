function createStore(reducer, initialState) {
    let state = initialState
    let subscribers = []
    return {
        getState() {
            return state
        },
        subscribe(sbr) {
            subscribers.push(sbr)
        },
        dispatch(action) {
            state = reducer(state, action)
            subscribers.forEach(x => x())
        }
    }
}

export {createStore}