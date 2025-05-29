import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($filter: ProductFilterInput!) {
    getProducts(filter: $filter) {
      data {
        id
        title
        description
        price
        category
        brand
      }
    }
  }
`;
