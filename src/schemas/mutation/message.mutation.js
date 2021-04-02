import { GraphQLString, GraphQLNonNull } from 'graphql';
import { postMessage } from '../../resolvers/query/message.resolver';
import messageType from '../../types/message.type';

export default {
  postMessage: {
    description: 'Post a new message in a forum',
    type: messageType,
    args: {
      content: {
        description: 'The content of the message',
        type: GraphQLNonNull(GraphQLString),
      },
      forumId: {
        description: 'The ID of the forum where the message is posted',
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: postMessage,
  },
};
