import React from 'react';

class Info extends React.Component {
    constructor(props) {
        super()
        this.number = 10
    }

    render() {
        return (
            <h1>Info: {this.number}</h1>
        )
    }
}


export default Info