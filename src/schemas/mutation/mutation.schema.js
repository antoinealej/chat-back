import { GraphQLObjectType } from 'graphql';
import forumMutations from './forum.mutation';
import messageMutations from './message.mutation';

const querySchema = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...forumMutations,
    ...messageMutations,
  },
});

export default querySchema;
