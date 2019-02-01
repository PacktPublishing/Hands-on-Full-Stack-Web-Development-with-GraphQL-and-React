import React, { Component } from 'react';
import SearchBar from './search';
import UserBar from './user';
import { UserConsumer } from '../context/user';

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
            </div>
        );
    }
}