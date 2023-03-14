import RepositoryItem from './Index'
import Text from '../Text'
import { FlatList } from 'react-native'
import ReviewItem from '../ReviewItem'
import ItemSeparator from '../common/ItemSeparator'
import useRepository from '../../hooks/useRepository'

const REVIEWS_FETCH_AMOUNT = 5

const RepositoryItemDetail = ({ id }) => {
  const { data, error, loading, fetchMore } = useRepository(
    id,
    REVIEWS_FETCH_AMOUNT
  )

  if (error) {
    console.log('oh no, error: ', error)
    return <Text>{error}</Text>
  }
  if (loading) return <Text>loading...</Text>

  const repository = data.repository
  const reviews = repository.reviews.edges.map((e) => e.node)

  const onEndReach = () => {
    fetchMore()
  }

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
      onEndReached={onEndReach}
      onEndReachedThreshold={0.2}
    />
  )
}

export default RepositoryItemDetail
