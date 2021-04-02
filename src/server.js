import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import bodyParser from 'body-parser';
import { SubscriptionServer } from 'subscriptions-transport-ws';
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
  const app = express();
  app.use('/graphql', bodyParser.json());

  const apolloServer = new ApolloServer({
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

      const localUser = user.get(userId);
      if (!localUser) {
        errorHandler('You must login first', 'NOT_AUTHENTICATED');
      }

      // Add the user to the context
      return { user: localUser };
    },
    playground: {
      subscriptionEndpoint: `ws://localhost:${configs.port}/subscriptions`,
    },
  });

  apolloServer.applyMiddleware({ app });
  const server = createServer(app);

  await new Promise((resolve) => {
    server.listen(configs.port, () => {
      resolve(new SubscriptionServer({
        execute,
        subscribe,
        schema,
      }, {
        server,
        path: '/subscriptions',
      }));
    });
  });

  logger.info(`🚀 Server ready at http://localhost:${configs.port}/graphql`);
  return { server, app };
}
