import { GraphQLObjectType, GraphQLString } from 'graphql';

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString, description: 'The user ID' },
    name: { type: GraphQLString, description: 'The user name' },
    picture: { type: GraphQLString, description: 'The user profile picture' },
  },
});

export default userType;
