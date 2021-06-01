import { gql } from "apollo-server";
export default gql`
  type Mutation {
    createCoffeeShop(
      name: String!
      categories: [String]!
      lat: Float!
      lng: Float!
      photos: [Upload]
    ): CommonResponse!
  }
`;
