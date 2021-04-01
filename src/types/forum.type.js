import { GraphQLObjectType, GraphQLString } from 'graphql';

const forumType = new GraphQLObjectType({
  name: 'Forum',
  fields: {
    id: { type: GraphQLString, description: 'The forum ID' },
    name: { type: GraphQLString, description: 'The forum name' },
  },
});

export default forumType;
