import { withFilter } from 'graphql-subscriptions';
import pubsub, { MESSAGE_POSTED } from '../../pubsub';

export const getAll = (_, { forumId }, { dataSources }) => dataSources.messageCollection
  .getAll(forumId);
export const postMessage = (_, { forumId, content }, { dataSources, user }) => dataSources
  .messageCollection
  .post({ forumId, content, userId: user.id });
export const subscribeForumMessage = withFilter(
  () => pubsub.asyncIterator(MESSAGE_POSTED),
  (payload, variables) => payload.forum.id === variables.forumId,
);
