import { gql } from '@apollo/client'

export const REPOSITORY_FIELDS = gql`
  fragment repositoryFields on Repository {
    id
    name
    ownerName
    fullName
    stargazersCount
    forksCount
    ratingAverage
    reviewCount
    url
    ownerAvatarUrl
    description
    language
    createdAt
  }
`
