import React, { Component } from 'react';
import SearchBar from './search';
import UserBar from './user';
import { UserConsumer } from '../context/user';
import Logout from './logout';
import Home from './home';

export default class Bar extends Component {
    render() {
        return (
            <div className="topbar">
                <div className="inner">
                    <SearchBar/>
                    <UserConsumer>
                        <UserBar />
                    </UserConsumer>
                </div>
                <div className="buttons">
                    <Home/>
                    <Logout changeLoginState={this.props.changeLoginState}/>
                </div>
            </div>
        );
    }
}