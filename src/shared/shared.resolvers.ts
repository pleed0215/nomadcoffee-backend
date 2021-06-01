import { GraphQLUpload } from "apollo-server";
import { GraphQLDate, GraphQLDateTime, GraphQLTime } from "graphql-iso-date";

export default {
  Upload: GraphQLUpload,
  GraphQLDateTime: GraphQLDateTime,
  GraphQLTime: GraphQLTime,
  GraphQLDate: GraphQLDate,
};
