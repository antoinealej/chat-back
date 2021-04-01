import { GraphQLSchema } from 'graphql';
import querySchema from './query/query.schema';

const schema = new GraphQLSchema({
  query: querySchema,
});

export default schema;
