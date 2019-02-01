import React, { Component } from 'react';
import Feed from './Feed';
import Chats from './Chats';
import Bar from './components/bar';
import CurrentUserQuery from './components/queries/currentUser';
import { UserConsumer } from './components/context/user';

export default class Main extends Component {
    render() {
        return (
            <CurrentUserQuery>
                <Bar changeLoginState={this.props.changeLoginState}/>
                <Feed />
                <UserConsumer><Chats /></UserConsumer>
            </CurrentUserQuery>
        );
    }
}