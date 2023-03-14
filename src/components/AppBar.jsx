import { View, StyleSheet, ScrollView, Pressable } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import { SubHeading } from './Text'
import { Link } from 'react-router-native'
import { useQuery } from '@apollo/client'
import { CURRENT_USER } from '../graphql/queries'
import useSignOut from '../hooks/useSignOut'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    display: 'flex',
    flexDirection: 'row',
  },
  header: {
    color: 'white',
    margin: 15,
  },
})

// Separate AppBarTab?
const AppBar = () => {
  const signOut = useSignOut()

  const { data, error, loading } = useQuery(CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
  })
  if (error) console.log('Oh no, error: ', error)

  const signedInView = () => (
    <>
      <Link to='/createReview'>
        <SubHeading style={styles.header}>Create a review</SubHeading>
      </Link>
      <Link to='/myReviews'>
        <SubHeading style={styles.header}>My reviews</SubHeading>
      </Link>
      <Pressable onPress={() => signOut()}>
        <SubHeading style={styles.header}>Sign out</SubHeading>
      </Pressable>
    </>
  )

  const signedOutView = () => (
    <>
      <Link to='/signin'>
        <SubHeading style={styles.header}>Sign in</SubHeading>
      </Link>
      <Link to='/signup'>
        <SubHeading style={styles.header}>Sign up</SubHeading>
      </Link>
    </>
  )

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/'>
          <SubHeading style={styles.header}>Repositories</SubHeading>
        </Link>
        {!loading && data.me && signedInView()}
        {!loading && !data.me && signedOutView()}
      </ScrollView>
    </View>
  )
}

export default AppBar
