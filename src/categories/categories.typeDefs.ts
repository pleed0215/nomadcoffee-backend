import { gql } from "apollo-server";
export default gql`
  type Category {
    id: Int!
    name: String!
    slug: String!

    """
    Cursor based 페이지네이션. lastId가 주어지면 lastId 다음부터 PAGE_SIZE만큼 paging.
    """
    shops(lastId: Int): [CoffeeShop]
    totalShops: Int

    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
  }

  type Query {
    seeCategory(slug: String!, lastId: Int): [CoffeeShop]
    seeCategories(lastId: Int): [Category]
  }
`;
