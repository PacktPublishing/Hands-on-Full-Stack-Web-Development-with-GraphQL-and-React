import React, { Component } from 'react';
import UsersSearchQuery from '../queries/searchQuery';
import SearchList from './searchList';

export default class SearchBar extends Component {
    state = {
        text: ''
    }
    changeText = (event) => {
        this.setState({text: event.target.value});
    }
    render() {
        const { text } = this.state;
        return (
            <div className="search">
                <input type="text" onChange={this.changeText} value={text} />
                <UsersSearchQuery variables={{text}}>
                    <SearchList />
                </UsersSearchQuery>
            </div>
        );
    }
}