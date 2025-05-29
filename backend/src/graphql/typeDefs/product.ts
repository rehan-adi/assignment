import { gql } from "graphql-tag";

export const productTypeDefs = gql`
  type Product {
    id: String!
    title: String!
    description: String!
    price: Float!
    brand: String!
    category: String!
  }

   input ProductFilterInput {
    search: String
    category: String
    sortBy: String 
    sortOrder: String
  }

  type GetProductsResponse {
    data: [Product]!
  }

  type Query {
    getProducts(filter: ProductFilterInput): GetProductsResponse!
  }
`;