import { GraphQLSchema } from 'graphql';
import querySchema from './query/query.schema';
import mutationSchema from './mutation/mutation.schema';
import subscriptionSchema from './subscription/subscription.schema';

const schema = new GraphQLSchema({
  query: querySchema,
  mutation: mutationSchema,
  subscription: subscriptionSchema,
});

export default schema;
