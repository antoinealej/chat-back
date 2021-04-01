import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import forumType from './forum.type';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString, description: 'The user ID' },
    name: { type: GraphQLString, description: 'The user name' },
    picture: { type: GraphQLString, description: 'The user profile picture' },
    forums: { type: new GraphQLList(forumType), description: 'The list of the forums the user joined' },
  },
});

export default userType;
