import { GraphQLObjectType } from 'graphql';
import forumQueries from './forum.schema';
import userQuery from './user.schema';
import messageQuery from './message.schema';

const querySchema = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...forumQueries,
    ...userQuery,
    ...messageQuery,
  },
});

export default querySchema;
