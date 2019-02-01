import { ApolloServer } from 'apollo-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import Resolvers from './resolvers';
import Schema from './schema';

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});

const server = new ApolloServer({
  schema: executableSchema,
  context: ({ req }) => req,
});

export default server;