import React, { Component } from 'react';
import Error from './error';
import LoginMutation from './mutations/login';
import RegisterMutation from './mutations/signup';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
    }
    login = (event) => {
        event.preventDefault();
        this.props.login({ variables: { email: this.state.email, password: 
        this.state.password }});
    }
    render() {
        const { error } = this.props;
        return (
            <div className="login">
                <form onSubmit={this.login}>
                    <label>Email</label>
                    <input type="text" onChange={(event) => this.setState({email: event.target.value})} />
                    <label>Password</label>
                    <input type="password" onChange={(event) => this.setState({password: event.target.value})} />
                    <input type="submit" value="Login" />
                </form>
                {error && (
                    <Error><p>There was an error logging in!</p></Error>
                )}
            </div>
        )
    }
}

class RegisterForm extends Component {
    state = {
        email: '',
        password: '',
        username: '',
    }
    login = (event) => {
        event.preventDefault();
        this.props.signup({ variables: { email: this.state.email, password: 
        this.state.password, username: this.state.username }});
    }
    render() {
        const { error } = this.props;
        return (
            <div className="login">
                <form onSubmit={this.login}>
                    <label>Email</label>
                    <input type="text" onChange={(event) => this.setState({email: event.target.value})} />
                    <label>Username</label>
                    <input type="text" onChange={(event) => this.setState({username: event.target.value})} />
                    <label>Password</label>
                    <input type="password" onChange={(event) => this.setState({password: event.target.value})} />
                    <input type="submit" value="Sign up" />
                </form>
                {error && (
                    <Error><p>There was an error logging in!</p></Error>
                )}
            </div>
        )
    }
}

export default class LoginRegisterForm extends Component {
    state = {
        showLogin: true
    }
    render() {
        const { changeLoginState } = this.props;
        const { showLogin } = this.state;
        return (
            <div className="authModal">
                {showLogin && (
                    <div>
                        <LoginMutation changeLoginState={changeLoginState}><LoginForm/></LoginMutation>
                        <a onClick={() => this.setState({ showLogin: false })}>Want to sign up? Click here</a>
                    </div>
                )}
                {!showLogin && (
                    <div>
                        <RegisterMutation changeLoginState={changeLoginState}><RegisterForm/></RegisterMutation>
                        <a onClick={() => this.setState({ showLogin: true })}>Want to login? Click here</a>
                    </div>
                )}
            </div>
        )
    }
}