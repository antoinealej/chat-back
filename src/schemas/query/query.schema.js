import { GraphQLObjectType } from 'graphql';
import forumQueries from './forum.query';
import userQuery from './user.query';
import messageQuery from './message.query';

const querySchema = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...forumQueries,
    ...userQuery,
    ...messageQuery,
  },
});

export default querySchema;
