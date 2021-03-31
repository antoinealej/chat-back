import helloResolver from './hello.resolver';

const resolvers = [helloResolver];

export default resolvers.reduce((result, current) => {
  const tempRes = { ...result };
  Object.entries(current).forEach(([type, value]) => {
    Object.entries(value).forEach(([key, func]) => {
      if (!tempRes[type]) tempRes[type] = {};
      tempRes[type][key] = func;
    });
  });
  return tempRes;
}, {});
