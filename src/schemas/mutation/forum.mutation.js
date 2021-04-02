import { GraphQLNonNull, GraphQLString } from 'graphql';
import forumType from '../../types/forum.type';
import { createForum, join } from '../../resolvers/query/forum.resolver';

export default {
  createForum: {
    description: 'Create a new forum',
    type: forumType,
    args: {
      name: {
        description: 'The name of the forum you want to create',
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: createForum,
  },
  joinForum: {
    description: 'Join a forum',
    type: forumType,
    args: {
      forumId: {
        description: 'The id of the forum you want to join',
        type: GraphQLNonNull(GraphQLString),
      },
    },
    resolve: join,
  },
};
