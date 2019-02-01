import React, { Component } from 'react';
import { toast } from 'react-toastify';

export default class ChatNotification extends Component {
    componentWillReceiveProps(props) {
        if(typeof props.data !== typeof undefined && typeof props.data.messageAdded !== typeof undefined)
        toast(props.data.messageAdded.text, { position: toast.POSITION.TOP_LEFT });
    }
    render() {
        return (null);
    }
}