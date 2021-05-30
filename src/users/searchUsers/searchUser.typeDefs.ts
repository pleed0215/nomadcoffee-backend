import { gql } from "apollo-server";
export default gql`
  type SearchUsersResponse {
    total: Int!
    results: [User]
  }
  type Query {
    """
    lastId: cursor based pagination. lastId가 제공되면 lastId 다음 record부터 data fetching.
    """
    searchUsers(term: String!, lastId: Int): SearchUsersResponse!
  }
`;
