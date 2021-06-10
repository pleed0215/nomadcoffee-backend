import { gql } from "apollo-server";

export default gql`
  type CoffeeShop {
    id: Int!
    name: String!
    lat: String
    lng: String
    address: String
    user: User
    photos(lastId: Int): [CoffeeShopPhoto]
    categories: [Category]

    firstPhotoUrl: String

    """
    Is my shop?
    """
    isMine: Boolean

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
