import React, { Component } from 'react';

export default class SearchList extends Component {
    closeList = () => {
        this.setState({showList: false});
    }
    state = {
        showList: this.checkLength(this.props.users),
    }
    componentWillReceiveProps(props) {
        this.showList(props.users);
    }
    checkLength(users) {
        if(users.length > 0) {
            document.addEventListener('click', this.closeList);
            return true;
        } else {
            return false;
        }
    }
    showList(users) {
        if(this.checkLength(users)) {
            this.setState({showList: true});
        } else {
            this.closeList();
        }
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.closeList);
    }
    render() {
        const { users } = this.props;
        const { showList } = this.state;
        return (
            showList && 
                <div className="result">
                    {users.map((user, i) => 
                        <div key={user.id} className="user">
                            <img src={user.avatar} />
                            <span>{user.username}</span>
                        </div>
                    )}
                </div>
        )
    }
}