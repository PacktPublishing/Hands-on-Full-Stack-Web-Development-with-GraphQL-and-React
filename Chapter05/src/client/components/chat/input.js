import React, { Component } from 'react';

export default class ChatInput extends Component {
    state = {
        value: ''
    }
    handleKeyPress = (event) => {
        const self = this;
        const { chat, addMessage } = this.props;

        if (event.key === 'Enter' && this.state.value.length) {
            addMessage({ variables: { message: { text: this.state.value, chatId: chat.id } } }).then(() => {
                self.setState({ value: '' });
            });
        }
    }
    onChangeChatInput = (event) => {
        event.preventDefault();

        this.setState({ value: event.target.value });
    }
    render() {
        return (
            <div className="input">
                <input type="text" value={this.state.value} onChange={this.onChangeChatInput} onKeyPress={this.handleKeyPress}/>
            </div>
        )
    }
}