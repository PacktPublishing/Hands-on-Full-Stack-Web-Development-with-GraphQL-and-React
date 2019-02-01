import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Loading from '../loading';
import Error from '../error';
import gql from 'graphql-tag';

const GET_USERS = gql`
    query usersSearch($page: Int, $limit: Int, $text: String!) { 
        usersSearch(page: $page, limit: $limit, text: $text) { 
            users {
                id
                avatar
                username
            }
        }
    }
`;

export default class UsersSearchQuery extends Component {
    getVariables() {
        const { variables } = this.props;
        var query_variables = {
            page: 0,
            limit: 5,
            text: ''
        };
        if (typeof variables !== typeof undefined) {
            if (typeof variables.page !== typeof undefined) {
                query_variables.page = variables.page;
            }
            if (typeof variables.limit !== typeof undefined) {
                query_variables.limit = variables.limit;
            }
            if (typeof variables.text !== typeof undefined) {
                query_variables.text = variables.text;
            }
        }
        return query_variables;
    }
    render() {
        const { children } = this.props;
        const variables = this.getVariables();
        const skip = (variables.text.length < 3);
        return(
            <Query query={GET_USERS} variables={variables} skip={skip}>
                {({ loading, error, data, fetchMore, refetch }) => {
                    if (loading || error || typeof data === typeof undefined) return null;

                    const { usersSearch } = data;
                    const { users } = usersSearch;
                    return React.Children.map(children, function(child){
                        return React.cloneElement(child, { users, fetchMore, variables, refetch });
                    });
                }}
            </Query>
        )
    }
}