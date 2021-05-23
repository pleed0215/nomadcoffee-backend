import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!

    createdAt: String
    updatedAt: String
  }
  type Query {
    seeUser(id: Int!): User
  }
`;
