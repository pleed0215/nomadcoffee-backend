import { gql } from "apollo-server";
export default gql`
  type Mutation {
    deleteCoffeeShop(id: Int!): CommonResponse!
  }
`;
