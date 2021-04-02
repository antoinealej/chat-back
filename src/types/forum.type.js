import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import userType from './user.type';

const forumType = new GraphQLObjectType({
  name: 'Forum',
  fields: {
    id: { type: GraphQLString, description: 'The forum ID' },
    name: { type: GraphQLString, description: 'The forum name' },
    users: { type: new GraphQLList(userType), description: 'The list of the users who joined the forum' },
  },
});

export default forumType;
