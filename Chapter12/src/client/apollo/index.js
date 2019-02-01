import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';

const protocol = (location.protocol != 'https:') ? 'ws://': 'wss://';
const port = location.port ? ':'+location.port: '';

const httpLink = createPersistedQueryLink().concat(createUploadLink({
  uri: location.protocol + '//' + location.hostname + port + '/graphql',
  credentials: 'same-origin',
}));

const SUBSCRIPTIONS_ENDPOINT = protocol + location.hostname + port + '/subscriptions';
const subClient = new SubscriptionClient(SUBSCRIPTIONS_ENDPOINT, {
  reconnect: true,
  connectionParams: () => {
    var token = localStorage.getItem('jwt');
    if(token) {
      return { authToken: token };
    }
    return { };
  }
});
const wsLink = new WebSocketLink(subClient);

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const InfoLink = (operation, next) => {
  operation.setContext(context => ({
    ...context,
    headers: {
      ...context.headers,
      'apollo-client-name': 'Apollo Frontend Client',
      'apollo-client-version': '1'
    },
  }));

  return next(operation);
};

const AuthLink = (operation, next) => {
  const token = localStorage.getItem('jwt');
  if(token) {
    operation.setContext(context => ({
      ...context,
      headers: {
        ...context.headers,
        Authorization: `Bearer ${token}`,
      },
    }));
  }
  return next(operation);
};

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path, extensions }) => {
          if(extensions.code === 'UNAUTHENTICATED') {
            localStorage.removeItem('jwt');
            client.resetStore();
          }
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }
    }),
    InfoLink,
    AuthLink,
    link
  ]),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});

export default client;