import { gql } from "apollo-server";

export default gql`
  type Mutation {
    addPhotosToShop(id: Int!, photos: [Upload]!): MutationResponse!
    removePhotoFromShop(id: Int!, photoId: Int!): MutationResponse!
  }
`;
