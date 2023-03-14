import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

export const SORT_REPOSITORIES_LATEST = 'latest'
export const SORT_REPOSITORIES_HIGHEST_RATED = 'highestRated'
export const SORT_REPOSITORIES_LOWEST_RATED = 'lowestRated'

const useRepositories = (sortOrder, searchKeyword, first) => {
  const orderBy =
    sortOrder === SORT_REPOSITORIES_LATEST ? 'CREATED_AT' : 'RATING_AVERAGE'
  const orderDirection =
    sortOrder === SORT_REPOSITORIES_LOWEST_RATED ? 'ASC' : 'DESC'

  const variables = { orderBy, orderDirection, searchKeyword, first }

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  if (error) console.log(error)

  const repositories = data ? data.repositories.edges.map((e) => e.node) : []
  return { repositories, loading, fetchMore: handleFetchMore }
}

export default useRepositories
