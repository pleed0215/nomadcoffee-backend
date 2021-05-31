import {
  loadFilesSync,
  makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from "graphql-tools";

// loadFileSync는 default export를 이용한다..??
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.{js,ts}`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.{js,ts}`);

const typeDefs = mergeTypeDefs(loadedTypes);

const resolvers = mergeResolvers(loadedResolvers);
export const schema = makeExecutableSchema({ typeDefs, resolvers });
