export const getAll = (_, __, { dataSources }) => dataSources.forumCollection.getAll();
export const getMyForums = (_, __, { dataSources, user }) => dataSources.forumCollection
  .getUserForums(user.id);
export const createForum = (_, { name }, { dataSources, user }) => dataSources.forumCollection
  .createForum({ name, userId: user.id });
export const join = (_, { forumId }, { dataSources, user }) => dataSources.forumCollection
  .join({ forumId, userId: user.id });
