import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import userType from '../../types/user.type';
import { getAll } from '../../resolvers/query/user.resolver';

export default {
  users: {
    args: {
      forumId: {
        description: 'The ID of the forum you want to get the users from',
        type: GraphQLNonNull(GraphQLString),
      },
    },
    description: 'List the users of a forum',
    type: new GraphQLList(userType),
    resolve: getAll,
  },
};
