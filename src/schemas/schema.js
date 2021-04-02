import { GraphQLSchema } from 'graphql';
import querySchema from './query/query.schema';
import mutationSchema from './mutation/mutation.schema';

const schema = new GraphQLSchema({
  query: querySchema,
  mutation: mutationSchema,
});

export default schema;
