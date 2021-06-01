import { gql } from "apollo-server";

export default gql`
  #from graphql-iso-date package

  scalar GraphQLDateTime
  scalar GraphQLDate
  scalar GraphQLTime

  # GraphQL Upload
  scalar Upload

  type CommonResponse {
    ok: Boolean!
    id: Int
    error: String
  }

  type MutationResponse {
    ok: Boolean!
    error: String
  }
`;
