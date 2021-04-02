import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export default pubsub;

export const MESSAGE_POSTED = 'message_posted';
