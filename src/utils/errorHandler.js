import { toApolloError } from 'apollo-server-express';

export default (message, code) => {
  throw toApolloError(new Error(message), code);
};
