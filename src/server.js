import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import configs from './configs';
import schema from './schemas/schema';
import logger from './utils/logger';
import {
  init,
  message,
  user,
  forum,
} from './services/cache';

export default async function startApolloServer() {
  init();
  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      userCollection: user,
      forumCollection: forum,
      messageCollection: message,
    }),
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port: configs.port }, resolve));
  logger.info(`🚀 Server ready at http://localhost:${configs.port}${server.graphqlPath}`);
  return { server, app };
}
