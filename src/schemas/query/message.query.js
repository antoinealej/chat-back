import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import messageType from '../../types/message.type';
import { getAll } from '../../resolvers/query/message.resolver';

export default {
  forumMessages: {
    args: {
      forumId: {
        description: 'The ID of the forum you want to get the messages from',
        type: GraphQLNonNull(GraphQLString),
      },
    },
    description: 'List the messages of a forum',
    type: new GraphQLList(messageType),
    resolve: getAll,
  },
};
