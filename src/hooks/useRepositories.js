import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })

  if (error) console.log(error)

  const repositories = data ? data.repositories.edges.map((e) => e.node) : []
  return { repositories, loading }
}

export default useRepositories
