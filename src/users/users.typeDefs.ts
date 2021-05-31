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

    """
    Followers based on offset pagination.
    """
    followers(page: Int): [User]
    """
    Followings based on offset pagination.
    """
    followings(page: Int): [User]

    """
    Are you logged in user?
    """
    isMe: Boolean
    totalFollowers: Int
    totalFollowings: Int

    isFollowing: Boolean
    isFollowed: Boolean

    createdAt: String
    updatedAt: String
  }

  type Query {
    seeUser(id: Int!): User
  }
`;
