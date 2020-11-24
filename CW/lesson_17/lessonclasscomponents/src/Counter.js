import React from 'react';
import ReactDOM from 'react-dom';
import { increment } from './actionCreators/counterActionCreators';


class Counter extends React.Component {
    constructor(props) {
        super()
        this.handleClick = this.handleClick.bind(this)
        // this.state = {count: 0}

        console.log(props)
    }

    handleClick(event) {
        // this.setState({count: this.state.count + 1})
        // this.setState(prevState => {
        //     return {count: prevState.count + 1}
        // })
        this.props.dispatch(increment())
    }

    render() {
        return (
            <>
                <h3>Counter: {this.props.count}</h3>
                <button onClick={this.handleClick}>+</button>
            </>
        )
    }
}

export default Counter