import React, { Component } from 'react';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        
    }
    add() {
        this.setState({
            num: this.state.num + 1
        });
        console.log(this);
        
    }
    render() {
        return (
            <div>
                <div>number is {this.state.num}</div>
                <button onClick={this.add.bind(this)} >num ++</button>
            </div>

        );
    }
}

export default Event;
