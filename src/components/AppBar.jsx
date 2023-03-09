import { View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import { SubHeading } from './Text'
import { Link } from 'react-router-native'

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
  return (
    <View style={styles.container}>
      <Link to='/'>
        <SubHeading style={styles.header}>Repositories</SubHeading>
      </Link>
      <Link to='/signin'>
        <SubHeading style={styles.header}>Sign in</SubHeading>
      </Link>
    </View>
  )
}

export default AppBar
