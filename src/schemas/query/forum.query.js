import { GraphQLList } from 'graphql';
import forumType from '../../types/forum.type';
import { getAll, getMyForums } from '../../resolvers/query/forum.resolver';

export default {
  forums: {
    description: 'List the forums',
    type: new GraphQLList(forumType),
    resolve: getAll,
  },
  myForums: {
    description: 'List of the forums I (the authenticated user) joined',
    type: new GraphQLList(forumType),
    resolve: getMyForums,
  },
};
