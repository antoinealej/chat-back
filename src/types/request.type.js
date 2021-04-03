import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import userType from './user.type';
import forumType from './forum.type';

const requestType = new GraphQLObjectType({
  name: 'Request',
  fields: {
    id: { type: GraphQLString, description: 'The request ID' },
    forum: { type: forumType, description: 'The forum the user requests to join the private forum' },
    isAccepted: { type: GraphQLBoolean, description: 'True if the request is accepted, false if it is denied' },
    isResolved: { type: GraphQLBoolean, description: 'True if the request is resolved, false otherwise' },
    user: { type: userType, description: 'The user who wants to join the private forum' },
  },
});

export default requestType;
