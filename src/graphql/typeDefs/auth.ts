import { gql } from "graphql-tag";

export const authTypeDefs = gql`
  type User {
    email: String!
    username: String!
  }

  type SignupResponse {
    data: User!
  }

  type SigninResponse {
    token: String!
    data: User!
  }

  type Mutation {
    signup(
      email: String!
      password: String!
      username: String!
    ): SignupResponse!
    signin(email: String!, password: String!): SigninResponse!
  }
`;