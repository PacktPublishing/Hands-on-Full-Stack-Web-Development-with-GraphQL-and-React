import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const LOGIN = gql`
  mutation login($email : String!, $password : String!) {
    login(email : $email, password : $password) {
      token
    }
 }`;
 
export default class LoginMutation extends Component {
  render() {
    const { children, changeLoginState } = this.props;
    return (
      <Mutation
        update = {(store, { data: { login } }) => {
            if(login.token) {
                localStorage.setItem('jwt', login.token);
                changeLoginState(true);
            }
        }}
      mutation={LOGIN}>
        {(login, { loading, error}) =>
          React.Children.map(children, function(child){
            return React.cloneElement(child, { login, loading, error });
          })
        }
      </Mutation>
    )
  }
}