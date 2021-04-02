import NodeCache from 'node-cache';
import fixtures from '../assets/fixtures.json';
import errorHandler from '../utils/errorHandler';
import { generateId } from '../utils/generator';
import pubsub, { MESSAGE_POSTED } from '../pubsub';

const userCache = new NodeCache();
const forumCache = new NodeCache();
const messageCache = new NodeCache();

export const init = () => {
  userCache.mset(fixtures.users.map((user) => ({ key: user.id, val: user })));
  forumCache.mset(fixtures.forums.map((forum) => ({ key: forum.id, val: forum })));
  messageCache.mset(fixtures.messages.map((message) => ({ key: message.id, val: message })));
};

export const user = {
  get(userId) {
    return userCache.get(userId);
  },
  getAll(forumId) {
    const localForum = forum.get(forumId);
    if (!localForum) {
      errorHandler(`The forum '${forumId}' does not exit`, 'NO_FORUM_FOUND');
    }
    return localForum.users;
  },
};

export const forum = {
  get(forumId) {
    return forumCache.get(forumId);
  },
  getAll() {
    return Object
      .values(forumCache.mget(forumCache.keys()))
      .sort((f1, f2) => f1.name.localeCompare(f2.name));
  },
  getByName(name) {
    return forum.getAll().find((f) => f.name === name);
  },
  getUserForums(userId) {
    return Object
      .values(forumCache.mget(forumCache.keys()))
      .filter((f) => f.users?.find((u) => u.id === userId));
  },
  createForum({ name, userId }) {
    if (forum.getByName(name)) {
      errorHandler(`The forum '${name}' already exist`, 'DUPLICATE_FORUM_NAME');
    }
    const newForum = {
      id: generateId(),
      name,
      users: [user.get(userId)],
    };
    forumCache.set(newForum.id, newForum);
    return newForum;
  },
  join({ userId, forumId }) {
    const cachedUser = userCache.get(userId);
    const cachedForum = forumCache.get(forumId);
    // if the user already joined this forum
    if (cachedForum.users.find((u) => u.id === userId)) {
      errorHandler('The user already joined this forum', 'DUPLICATE_FORUM_JOIN');
    }
    cachedForum.users.push(cachedUser);
    forumCache.del(forumId);
    forumCache.set(cachedForum.id, cachedForum);
    return cachedForum;
  },
};

export const message = {
  getAll(forumId) {
    return Object
      .values(messageCache.mget(messageCache.keys()))
      .filter((m) => m.forum.id === forumId)
      // Make sure the message as a content, send time, author name and author picture
      .filter((m) => m.sentAt && m.content && m.author && m.author.name && m.author.picture)
      .sort((m1, m2) => new Date(m1.sentAt).getTime() - new Date(m2.sentAt).getTime());
  },
  post({ content, userId, forumId }) {
    const localForum = forum.get(forumId);

    if (!localForum) {
      errorHandler(`The forum '${forumId}' does not exit`, 'NO_FORUM_FOUND');
    }
    if (!localForum.users.find((u) => u.id === userId)) {
      errorHandler(`The user '${userId}' did not join the forum '${forumId}'`, 'NOT_JOIN_FORUM');
    }

    const localMessage = {
      id: generateId(),
      content,
      sentAt: new Date().toISOString(),
      forum: localForum,
      author: user.get(userId),
    };
    messageCache.set(localMessage.id, localMessage);

    pubsub.publish(MESSAGE_POSTED, localMessage);

    return localMessage;
  },
};
