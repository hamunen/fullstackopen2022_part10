import RepositoryItem from './Index'
import Text from '../Text'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../../graphql/queries'
import { FlatList } from 'react-native'
import ReviewItem from '../ReviewItem'
import ItemSeparator from '../common/ItemSeparator'

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

  const repository = data.repository
  const reviews = repository.reviews.edges.map((e) => e.node)

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem item={repository} url={repository.url} />
          <ItemSeparator />
        </>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default RepositoryItemDetail
