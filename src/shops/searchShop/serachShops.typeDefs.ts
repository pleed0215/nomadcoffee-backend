import { gql } from "apollo-server";

export default gql`
  type Query {
    searchShopsByUserId(id: Int!): [CoffeeShop]
    searchShopsByTerm(term: String!): [CoffeeShop]
  }
`;
