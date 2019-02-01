import React from 'react';
import { ApolloProvider } from 'react-apollo';
import App from './app';

export default class ServerClient extends React.Component {
  render() {
    const { client, location, context, loggedIn } = this.props;
    return(
      <ApolloProvider client={client}>
        <App location={location} context={context} loggedIn={loggedIn}/>
      </ApolloProvider>
    );
  }
}