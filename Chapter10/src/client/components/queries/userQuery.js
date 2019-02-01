import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Loading from '../loading';
import Error from '../error';
import gql from 'graphql-tag';

const GET_USER = gql`
  query user($username: String!) { 
    user(username: $username) { 
      id
      email
      username
      avatar
    }
  }
`;

export default class UserQuery extends Component {
    getVariables() {
        const { variables } = this.props;
        var query_variables = {};
        if(typeof variables.username !== typeof undefined) {
            query_variables.username = variables.username;
        }
        return query_variables;
    }
    render() {
        const { children } = this.props;
        const variables = this.getVariables();
        return(
            <Query query={GET_USER} variables={variables}>
                {({ loading, error, data }) => {
                    if (loading) return <Loading />;
                    if (error) return <Error><p>{error.message}</p></Error>;
                    const { user } = data;
                    return React.Children.map(children, function(child){
                        return React.cloneElement(child, { user });
                    })
                }}
            </Query>
        )
    }
}