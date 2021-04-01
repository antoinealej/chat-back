export const getAll = (_, { forumId }, { dataSources }) => dataSources.messageCollection
  .getAll(forumId);
