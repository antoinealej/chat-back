import { GraphQLNonNull, GraphQLString } from 'graphql';
import messageType from '../../types/message.type';
import { subscribeForumMessage } from '../../resolvers/query/message.resolver';

export default {
  feedMessages: {
    description: 'Subscription of a forum messages',
    type: messageType,
    args: {
      forumId: {
        description: 'The ID of the forum to subscribe to',
        type: GraphQLNonNull(GraphQLString),
      },
    },
    subscribe: subscribeForumMessage,
    resolve: (message) => message,
  },
};
