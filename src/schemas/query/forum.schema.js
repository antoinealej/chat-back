import { GraphQLList } from 'graphql';
import forumType from '../../types/forum.type';
import { getAll } from '../../resolvers/query/forum.resolver';

export default {
  forums: {
    description: 'List the forums',
    type: new GraphQLList(forumType),
    resolve: getAll,
  },
};
