import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String
    avatarURL: String
    location: String
    githubUsername: String

    createdAt: String
    updatedAt: String
  }
  type Query {
    seeProfile(id: Int!): User
  }
`;
