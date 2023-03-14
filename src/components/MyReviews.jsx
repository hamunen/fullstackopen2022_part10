import { useMutation, useQuery } from '@apollo/client'
import { FlatList, Pressable, StyleSheet, View, Alert } from 'react-native'
import { useNavigate } from 'react-router'
import { DELETE_REVIEW } from '../graphql/mutations'
import { CURRENT_USER } from '../graphql/queries'
import theme from '../theme'
import ItemSeparator from './common/ItemSeparator'
import ReviewItem from './ReviewItem'
import Text, { SubHeading } from './Text'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  buttonContainer: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // gap: 10, didn't work on iphone?
  },
  viewButton: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: '3%',
    flexGrow: 1,
    marginRight: 5,
  },
  viewText: {
    color: 'white',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    padding: 15,
    borderRadius: '3%',
    flexGrow: 1,
    marginLeft: 5,
  },
  deleteText: {
    color: 'white',
    textAlign: 'center',
  },
})

const MyReviewContainer = ({ review, refetch }) => {
  const navigate = useNavigate()
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onCompleted: refetch,
  })

  const alert = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review??',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yessir, do it',
          onPress: () => deleteReview({ variables: { id: review.id } }),
        },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <ReviewItem review={review} headerText={review.repository.fullName} />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.viewButton}
          onPress={() => navigate(`/repositories/${review.repository.id}`)}
        >
          <SubHeading style={styles.viewText}>View repository</SubHeading>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={alert}>
          <SubHeading style={styles.deleteText}>Delete review</SubHeading>
        </Pressable>
      </View>
    </View>
  )
}

const MyReviews = () => {
  const { data, error, loading, refetch } = useQuery(CURRENT_USER, {
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
        <MyReviewContainer review={item} refetch={refetch} />
      )}
    />
  )
}

export default MyReviews
