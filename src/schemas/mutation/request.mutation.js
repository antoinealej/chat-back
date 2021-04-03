import { GraphQLBoolean, GraphQLString } from 'graphql';
import requestType from '../../types/request.type';

export default {
  resolveRequest: {
    description: 'Accept or refuse a request',
    type: requestType,
    args: {
      requestId: {
        description: 'The ID of the request the admin wants to resolve',
        type: GraphQLString,
      },
      isAccepted: {
        description: 'True if the request is accepted, false if it is denied',
        type: GraphQLBoolean,
      },
    },
  },
};
