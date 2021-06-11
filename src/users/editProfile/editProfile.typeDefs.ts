import { gql } from "apollo-server";
export default gql`
  type AvatarResponse {
    ok: Boolean!
    error: String
    url: String
  }
  type Mutation {
    editProfile(
      id: Int!
      username: String
      email: String
      password: String
      name: String
      location: String
      githubUsername: String
    ): CommonResponse!
    updateAvatar(file: Upload!): AvatarResponse!
  }
`;
