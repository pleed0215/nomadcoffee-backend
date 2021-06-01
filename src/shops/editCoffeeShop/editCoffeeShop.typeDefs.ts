import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editCoffeeShop(
      id: Int!
      name: String
      categories: [String]
      lat: Float
      lng: Float
      photos: [Upload]
    ): MutationResponse!
  }
`;
