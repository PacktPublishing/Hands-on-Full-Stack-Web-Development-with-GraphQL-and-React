import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';

export default (req, loggedIn) => {
    const AuthLink = (operation, next) => {
        if(loggedIn) {
            operation.setContext(context => ({
            ...context,
            headers: {
                ...context.headers,
                Authorization: req.cookies.get('authorization')
            },
            }));
        }
        return next(operation)
    };
    const InfoLink = (operation, next) => {
        operation.setContext(context => ({
          ...context,
          headers: {
            ...context.headers,
            'apollo-client-name': 'Apollo Backend Client',
            'apollo-client-version': '1'
          },
        }));
    
        return next(operation);
    };
    const client = new ApolloClient({
        ssrMode: true,
        link: ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors) {
                    graphQLErrors.map(({ message, locations, path, extensions }) => {
                        console.log(`[GraphQL error]: Message: ${message}, 
                        Location: ${locations}, Path: ${path}`);
                    });
                    if (networkError) {
                        console.log(`[Network error]: ${networkError}`);
                    }
                }
            }),
            InfoLink, 
            AuthLink,
            createPersistedQueryLink().concat(new HttpLink({
                uri: 'http://localhost:8000/graphql',
                credentials: 'same-origin',
                fetch
            }))
        ]),
        cache: new InMemoryCache(),
    });
    return client;
};