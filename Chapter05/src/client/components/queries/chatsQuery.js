import React, { Component } from 'react';
import { Query } from "react-apollo";
import Loading from '../loading';
import Error from '../error';
import gql from "graphql-tag";

const GET_CHATS = gql`
  query chats { 
    chats {
      id
      users {
        id
        avatar
        username
      }
      lastMessage {
        text
      }
    }
  }
`;


export default class UserQuery extends Component {
    render() {
        const { children } = this.props;
        return(
            <Query query={GET_CHATS}>
                {({ loading, error, data }) => {
                    if (loading) return <Loading/>;
                    if (error) return <Error><p>{error.message}</p></Error>;

                    const { chats } = data;
                    return React.Children.map(children, function(child){
                        return React.cloneElement(child, { chats });
                    })
                }}
            </Query>
        )
    }
}