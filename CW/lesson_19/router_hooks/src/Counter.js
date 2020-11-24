import React from 'react'
import { useState, useEffect } from 'react'


function Counter() {
    let [count, setCount] = useState(0)
    const increment = () => setCount(count + 1)

    useEffect(() => {
        console.log("componentDidMount")
    }, [])

    useEffect(() => {
        console.log("componentDidUpdate")
    }, [count])


    console.log("render()")
    return (
        <>
            <h3>Counter: {count}</h3>
            <button onClick={increment}>+</button>
        </>
    )
}

export default Counter