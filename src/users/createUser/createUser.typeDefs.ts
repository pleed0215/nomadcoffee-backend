import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createUser(username: String!, email: String!): CommonResponse!
  }
`;
