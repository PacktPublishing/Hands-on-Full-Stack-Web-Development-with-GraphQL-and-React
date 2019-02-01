import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const GET_CHAT = gql`
    query chat($chatId: Int!) {
        chat(chatId: $chatId) {
            id
            users {
                id
                avatar
                username
            }
            messages {
                id
                text
                user {
                    id
                }
            }
        }
    }
`;

const ADD_MESSAGE = gql`
    mutation addMessage($message : MessageInput!) {
        addMessage(message : $message) {
            id
            text
            user {
                id
            }
        }
    }
`;

export default class AddMessageMutation extends Component {
    render() {
        const { children, chat } = this.props;
        return (
            <Mutation
                update = {(store, { data: { addMessage } }) => {
                    const data = store.readQuery({ query: GET_CHAT, variables: { chatId: chat.id } });
                    data.chat.messages.push(addMessage);
                    store.writeQuery({ query: GET_CHAT, variables: { chatId: chat.id }, data });
                }}
                mutation={ADD_MESSAGE}>
                    {addMessage => (
                        React.Children.map(children, function(child){
                            return React.cloneElement(child, { addMessage });
                        })
                    )}
            </Mutation>
        );
    }
}