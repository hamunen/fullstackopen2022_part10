import { useQuery } from '@apollo/client'
import { FlatList } from 'react-native'
import { CURRENT_USER } from '../graphql/queries'
import ItemSeparator from './common/ItemSeparator'
import ReviewItem from './ReviewItem'
import Text from './Text'

const MyReviews = () => {
  const { data, error, loading } = useQuery(CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  })

  if (error) {
    console.log('oh no, error: ', error)
    return <Text>{error}</Text>
  }
  if (loading) return <Text>loading...</Text>

  const reviews = data.me.reviews.edges.map((e) => e.node)

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} headerText={item.repository.fullName} />
      )}
    />
  )
}

export default MyReviews
