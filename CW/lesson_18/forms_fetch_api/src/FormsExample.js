import React from 'react'

class FormsExample extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            firstname: '',
            agree: false
        }


        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        console.log("componentDidMount()")
    }

    componentDidUpdate() {
        console.log("componentDidUpdate()");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps)
        console.log(nextState)
        return this.state.count < 5 ? true : false
    }

    handleSubmit(event) {
        event.preventDefault()
    }

    handleChange(event) {
        const {value, checked, name} = event.target
        if (name === 'agree') {
            this.setState({
                ...this.state,
                agree: checked 
            })
        } else {
            this.setState({
                ...this.state,
                firstname: value      
            })
        }
    }

    render() {
        return (
            <>
                <h1>Count: {this.state.count}</h1>
                <button onClick={() => this.setState({count: this.state.count + 1})}>Click me</button>


                <div className="d-flex justify-content-around">
                    <div>
                        <form>
                            <div className="form-group">
                                <label>Name:</label>
                                <input className="form-control" 
                                       type="text" 
                                       value={this.state.firstname}
                                       onChange={this.handleChange}></input>
                            </div>
                            <div className="form-group">
                                <input id="agree" 
                                       name="agree" 
                                       type="checkbox"
                                       checked={this.state.agree}
                                       onChange={this.handleChange}></input>
                                <label htmlFor="agree">Agree?</label>
                               
                            </div>

                            <button className="btn btn-primary" onClick={this.handleSubmit}>Send</button>
                        </form>
                    </div>

                    <div>
                        <div>{this.state.firstname}</div>
                        <div>{this.state.agree ? "Checked" : "Unchecked"}</div>
                    </div>


                </div>


            </>
        )
    }
}

export default FormsExample