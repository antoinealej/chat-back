export const getAll = (_, { forumId }, { dataSources }) => dataSources.userCollection
  .getAll(forumId);
