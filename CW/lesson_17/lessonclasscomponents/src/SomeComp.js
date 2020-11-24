import { increment_morozov } from "./actionCreators/counterActionCreators"

function SomeComp(props) {
    return (
        <button onClick={() => props.dispatch(increment_morozov())}>Morozov</button>
    )
}

export default SomeComp