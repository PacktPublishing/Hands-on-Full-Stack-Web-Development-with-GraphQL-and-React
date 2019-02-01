import React, { Component } from 'react';
import AddMessageMutation  from '../mutations/addMessage';
import ChatInput from './input';

export default class ChatWindow extends Component {
    render() {
        const { chat, closeChat, user } = this.props;
        return (
            <div className="chatWindow">
                <div className="header">
                    <span>{chat.users[1].username}</span>
                    <button className="close" onClick={() => closeChat(chat.id)}>X</button>
                </div>
                <div className="messages">
                    {chat.messages.map((message, j) => 
                        <div key={'message' + message.id} className={'message ' + (message.user.id > 1 ? 'left' : 'right')}>
                            {message.text}
                        </div>
                    )}
                </div>
                <AddMessageMutation chat={chat}>
                    <ChatInput chat={chat}/>
                </AddMessageMutation>
            </div>
        )
    }
}