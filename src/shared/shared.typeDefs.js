import { gql } from "apollo-server";

export default gql`
  type CommonResponse {
    ok: Boolean!
    id: Int
    error: String
  }
`;
