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
    """
    Total number of user followed
    """
    totalFollowers: Int
    """
    Total number of user following
    """
    totalFollowings: Int

    """
    Am I following you?
    """
    isFollowing: Boolean
    """
    Are you following me?
    """
    isFollowed: Boolean

    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
  }

  type Query {
    seeUser(id: Int!): User
    me: User
  }
`;
