// import {some1} from './some1'
// import {some2} from './some2'
// import {some3} from './some3'




// console.log("index.js")

// some1()
// some2()
// some3()

import {createStore} from './createStore'
import {counterReducer} from './counterReducer'
import {increment, decrement} from './actionCreators'

let incBtn = document.getElementById('incrementBtn')
let decBtn = document.getElementById('decrementBtn')
let counter = document.getElementById('counter')

let store = createStore(counterReducer, {counter: 50})


incBtn.addEventListener('click', function() {
    store.dispatch(increment())
})


decBtn.addEventListener('click', function() {
    store.dispatch(decrement())
})

store.subscribe(function() {
    render();
})

store.dispatch({type: ''})

function render() {
    counter.innerText = store.getState().counter
}



