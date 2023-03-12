import { StyleSheet, View } from 'react-native'
import theme from '../../theme'
import Text, { SubHeading } from '../Text'
import { format, parseISO } from 'date-fns'

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  ratingContainer: {
    borderWidth: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating: {
    color: theme.colors.primary,
  },
  contentContainer: {
    paddingLeft: 10,
    flex: 1,
  },
  headerContainer: {
    height: 40,
    justifyContent: 'center',
  },
})

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <SubHeading>{review.user.username}</SubHeading>
          <Text color='textSecondary'>
            {format(parseISO(review.createdAt), 'dd.MM.yyyy')}
          </Text>
        </View>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}

export default ReviewItem
