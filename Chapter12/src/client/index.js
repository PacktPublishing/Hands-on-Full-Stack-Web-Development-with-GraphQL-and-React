import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';

ReactDOM.hydrate(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
, document.getElementById('root'));