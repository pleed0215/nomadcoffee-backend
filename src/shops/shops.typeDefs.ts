import { gql } from "apollo-server";

export default gql`
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String
    longitude: String
    user: User
    photos: [CoffeeShopPhoto]
    categories: [Category]

    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
  }

  type CoffeeShopPhoto {
    id: Int!
    url: String
    shop: CoffeeShop

    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
  }

  type Query {
    seeCoffeeShop(id: Int!): CoffeeShop
    seeCoffeeShops(lastId: Int): [CoffeeShop]
  }
`;