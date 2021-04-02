export const getAll = (_, { forumId }, { dataSources }) => dataSources.messageCollection
  .getAll(forumId);
export const postMessage = (_, { forumId, content }, { dataSources, user }) => dataSources
  .messageCollection
  .post({ forumId, content, userId: user.id });
