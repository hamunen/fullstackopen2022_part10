import RepositoryItem from './Index'
import Text from '../Text'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../../graphql/queries'

const RepositoryItemDetail = ({ id }) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  })

  if (error) {
    console.log('oh no, error: ', error)
    return <Text>{error}</Text>
  }
  if (loading) return <Text>loading...</Text>

  const item = data.repository
  return <RepositoryItem item={item} url={item.url} />
}

export default RepositoryItemDetail
