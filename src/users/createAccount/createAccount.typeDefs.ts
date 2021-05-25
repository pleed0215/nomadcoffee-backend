import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createAccount(
      username: String!
      email: String!
      password: String!
      name: String
      location: String
      githubUsername: String
    ): CommonResponse!
  }
`;
