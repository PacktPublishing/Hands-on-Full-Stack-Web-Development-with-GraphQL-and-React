import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';

export class UserConsumer extends Component {
    render() {
        const { children } = this.props;
        return (
            <ApolloConsumer>
                {client => {
                    // Use client.readQuery to get the current logged in user.
                    const user = {
                        username: "Test User",
                        avatar: "/uploads/avatar1.png"
                    };
                    return React.Children.map(children, function(child){
                        return React.cloneElement(child, { user });
                    });
                }}
            </ApolloConsumer>
        )
    }
}