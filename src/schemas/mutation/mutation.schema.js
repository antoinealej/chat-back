import { GraphQLObjectType } from 'graphql';
import forumMutations from './forum.mutation';
import messageMutations from './message.mutation';
import requestMutations from './request.mutation';

const querySchema = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...forumMutations,
    ...messageMutations,
    ...requestMutations,
  },
});

export default querySchema;
