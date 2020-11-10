import React from 'react'

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = { completed: props.completed }
    }

    handleClick(e) {
        this.setState((s) => {
            return { completed: !s.completed }
        })
    }

    render() {
        return (
            <div>
                <span>{this.props.text}</span>
                <input
                    onChange={(e) => this.handleClick(e)}
                    type="checkbox"
                    checked={this.state.completed}
                ></input>
            </div>
        )
    }
}

export default TodoItem
