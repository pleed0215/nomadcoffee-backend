import { gql } from "apollo-server";
export default gql`
  type LoginResponse {
    ok: Boolean!
    error: String
    token: String
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse!
  }
`;
