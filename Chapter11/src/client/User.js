import React, { Component } from 'react';
import UserProfile from './components/user';
import Chats from './Chats';
import Bar from './components/bar';
import CurrentUserQuery from './components/queries/currentUser';
import { UserConsumer } from './components/context/user';

export default class User extends Component {
    render() {
        return (
            <CurrentUserQuery>
                <Bar changeLoginState={this.props.changeLoginState}/>
                <UserProfile username={this.props.match.params.username}/>
                <UserConsumer><Chats /></UserConsumer>
            </CurrentUserQuery>
        );
    }
}