import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import Resolvers from './resolvers';
import Schema from './schema';

export default (utils) => {
  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(utils),
  });
 
  const server = new ApolloServer({
    schema: executableSchema,
    context: ({ req }) => req,
  });
  
  return server;
};