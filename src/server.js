import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import configs from './configs';
import typeDefs from './schemas/schemas';
import resolvers from './resolvers/resolvers';
import logger from './utils/logger';

export default async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port: configs.port }, resolve));
  logger.info(`🚀 Server ready at http://localhost:${configs.port}${server.graphqlPath}`);
  return { server, app };
}
