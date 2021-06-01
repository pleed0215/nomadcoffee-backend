import { gql } from "apollo-server";

export default gql`
  type Mutation {
    addCategoriesToShop(id: Int!, categories: [String]!): MutationResponse!
    removeCategoryFromShop(id: Int!, slug: String!): MutationResponse!
  }
`;
