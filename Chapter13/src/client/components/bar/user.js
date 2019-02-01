import React, { Component } from 'react';
import UploadAvatarMutation from '../mutations/uploadAvatar';
import AvatarUpload from '../avatarModal';

export default class UserBar extends Component {
    state = {
        isOpen: false,
    }
    showModal = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    render() {
        const { user } = this.props;
        if(!user) return null;
        return (
            <div className="user">
                <img src={user.avatar} onClick={this.showModal}/>
                <UploadAvatarMutation>
                    <AvatarUpload isOpen={this.state.isOpen} showModal={this.showModal}/>
                </UploadAvatarMutation>
                <span>{user.username}</span>
            </div>
        );
    }
}