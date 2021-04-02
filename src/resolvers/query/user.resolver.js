export const getAll = (_, { forumId }, { dataSources }) => dataSources.userCollection
  .getAll(forumId);
export const getSelf = (_, __, { dataSources, user }) => dataSources.userCollection
  .get(user.id);
