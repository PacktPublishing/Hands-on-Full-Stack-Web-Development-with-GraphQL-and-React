import React, { Component } from 'react';

export default class UserProfileHeader extends Component {
    render() {
        const { avatar, email, username } = this.props.user;
        return (
            <div className="profileHeader">
                <div className="avatar">
                    <img src={avatar}/>
                </div>
                <div className="information">
                    <p>
                        {username}
                    </p>
                    <p>
                        {email}
                    </p>
                    <p>You can provide further information here and build your really personal header component for your users.</p>
                </div>
            </div>
        )
    }
}