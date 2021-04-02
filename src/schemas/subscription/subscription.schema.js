import { GraphQLObjectType } from 'graphql';
import messageSubscriptions from './message.subscription';

const subscriptionSchema = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ...messageSubscriptions,
  },
});

export default subscriptionSchema;
