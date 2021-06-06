"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var graphql_tools_1 = require("graphql-tools");
// loadFileSync는 default export를 이용한다..??
var loadedTypes = graphql_tools_1.loadFilesSync(__dirname + "/**/*.typeDefs.{js,ts}");
var loadedResolvers = graphql_tools_1.loadFilesSync(__dirname + "/**/*.resolvers.{js,ts}");
var typeDefs = graphql_tools_1.mergeTypeDefs(loadedTypes);
var resolvers = graphql_tools_1.mergeResolvers(loadedResolvers);
exports.schema = graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });
