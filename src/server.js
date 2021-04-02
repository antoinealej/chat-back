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
import errorHandler from './utils/errorHandler';

export default async function startApolloServer() {
  init();
  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      userCollection: user,
      forumCollection: forum,
      messageCollection: message,
    }),
    context: ({ req }) => {
      // We should verify and decode the token to get the user ID but since we don't
      // implement the auth part the authorization header will be the userId
      const userId = req.headers.authorization || '';

      const u = user.get(userId);
      if (!u) {
        errorHandler('You must login first', 'NOT_AUTHENTICATED');
      }

      // Add the user to the context
      return { user: u };
    },
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port: configs.port }, resolve));
  logger.info(`🚀 Server ready at http://localhost:${configs.port}${server.graphqlPath}`);
  return { server, app };
}
