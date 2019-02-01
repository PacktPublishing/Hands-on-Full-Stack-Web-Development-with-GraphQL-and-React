import React, { Component } from 'react';
import Modal from 'react-modal';
import DropNCrop from '@synapsestudios/react-drop-n-crop';

Modal.setAppElement('#root');

const modalStyle = {
    content: {
        width: '400px',
        height: '450px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
   
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    const file = new Blob([ia], {type:mimeString});
    return file;
}

export default class AvatarUpload extends Component {
    state = { 
        result: null,
        filename: null,
        filetype: null,      
        src: null,
        error: null,
    }
    onChange = value => {
        this.setState(value);
    }
    uploadAvatar = () => {
        const self = this;
        var file = dataURItoBlob(this.state.result);
        file.name = this.state.filename;
        this.props.uploadAvatar({variables: { file }}).then(() => {
            self.props.showModal();
        });
    }
    changeImage = () => {
        this.setState({ src: null });
    }
    render() {
        return (
            <Modal
            isOpen={this.props.isOpen}
            onRequestClose={this.props.showModal}
            contentLabel="Change avatar"
            style={modalStyle}
            >
            <DropNCrop onChange={this.onChange} value={this.state} />
            {this.state.src !== null && (
                <button className="cancelUpload" onClick=
                {this.changeImage}>Change image</button>
            )}
            <button className="uploadAvatar" onClick=
            {this.uploadAvatar}>Save</button>
            </Modal>
        )
    }
}