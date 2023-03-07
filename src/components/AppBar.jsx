import { View, StyleSheet, Pressable } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import { SubHeading } from './Text'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    display: 'flex',
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
      <Pressable onPress={() => console.log('jees')}>
        <SubHeading style={styles.header}>Repositories</SubHeading>
      </Pressable>
    </View>
  )
}

export default AppBar
