import { GraphQLObjectType, GraphQLString } from 'graphql';
import forumType from './forum.type';
import userType from './user.type';

const messageType = new GraphQLObjectType({
  name: 'Message',
  fields: {
    id: { type: GraphQLString, description: 'The message ID' },
    content: { type: GraphQLString, description: 'The content of the message sent by the author' },
    author: { type: userType, description: 'The author of the message' },
    forum: { type: forumType, description: 'The forum the message as been sent on' },
    sentAt: { type: GraphQLString, description: 'The date and time the message has been sent' },
  },
});

export default messageType;
