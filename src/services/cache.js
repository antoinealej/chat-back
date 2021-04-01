import NodeCache from 'node-cache';
import fixtures from '../assets/fixtures.json';

const userCache = new NodeCache();
const forumCache = new NodeCache();
const messageCache = new NodeCache();

export const init = () => {
  userCache.mset(fixtures.users.map((user) => ({ key: user.id, val: user })));
  forumCache.mset(fixtures.forums.map((forum) => ({ key: forum.id, val: forum })));
  messageCache.mset(fixtures.messages.map((message) => ({ key: message.id, val: message })));
};

export const user = {
  getAll(forumId) {
    return Object.values(
      userCache.mget(userCache.keys()),
    ).filter((u) => u.forums?.find((f) => f.id === forumId));
  },
};

export const forum = {
  getAll() {
    return Object.values(forumCache.mget(forumCache.keys()));
  },
};

export const message = {
  getAll(forumId) {
    return Object.values(
      messageCache.mget(messageCache.keys()),
    ).filter((m) => m.forum.id === forumId);
  },
};
