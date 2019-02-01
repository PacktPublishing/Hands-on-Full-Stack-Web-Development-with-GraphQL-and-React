import React, { Component } from 'react';
import { Query } from "react-apollo";
import Loading from '../loading';
import Error from '../error';
import gql from "graphql-tag";

const GET_CURRENT_USER = gql`
  query currentUser { 
    currentUser { 
      id
      username
      avatar
    }
  }
`;

export default class CurrentUserQuery extends Component {
    render() {
        const { children } = this.props;
        return(
            <Query query={GET_CURRENT_USER}>
                {({ loading, error, data }) => {
                    if (loading) return <Loading />;
                    if (error) return <Error><p>{error.message}</p></Error>;

                    const { currentUser } = data;
                    return React.Children.map(children, function(child){
                        return React.cloneElement(child, { currentUser });
                    })
                }}
            </Query>
        )
    }
}