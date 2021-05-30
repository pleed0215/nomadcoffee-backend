import { gql } from "apollo-server";
export default gql`
  type FollowResponse {
    ok: Boolean!
    error: String
    "Return boolean according to follow or unfollow"
    followed: Boolean
    message: String
  }
  type Mutation {
    toggleFollow(userId: Int!): FollowResponse!
  }
`;
