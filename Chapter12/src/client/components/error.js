import React, { Component } from 'react';

export default class Error extends Component {
    render() {
        const { children } = this.props;
        
        return (
        <div className="error message">
            {children}
        </div>
        );
    }
}