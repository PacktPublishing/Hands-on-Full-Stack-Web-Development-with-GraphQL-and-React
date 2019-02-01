import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Home extends Component {
    goHome = () => {
        this.props.history.push('/app');
    }
    render() {
        return (
            <button className="goHome" onClick={this.goHome}>Home</button>
        );
    }
}

export default withRouter(Home);