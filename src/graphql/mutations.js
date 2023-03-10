import { gql } from '@apollo/client'

export const AUTHENTICATE = gql`
  mutation {
    authenticate(credentials: { username: "kalle", password: "password" }) {
      accessToken
    }
  }
`
