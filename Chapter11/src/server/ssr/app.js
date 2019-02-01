import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { withApollo } from 'react-apollo';
import '../../client/components/fontawesome';
import Router from '../../client/router';

class App extends Component {
    state = {
        loggedIn: this.props.loggedIn
    }
    changeLoginState = (loggedIn) => {
        this.setState({ loggedIn });
    }
    render() {
        return (
            <div>
                <Helmet>
                    <title>Graphbook - Feed</title>
                    <meta name="description" content="Newsfeed of all your friends on Graphbook" />
                </Helmet>
                <Router loggedIn={this.state.loggedIn} changeLoginState={this.changeLoginState} location={this.props.location} context={this.props.context}/>
            </div>
        )
    }
}

export default withApollo(App)