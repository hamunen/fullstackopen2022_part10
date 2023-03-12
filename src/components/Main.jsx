import { StyleSheet, View } from 'react-native'
import theme from '../theme'
import AppBar from './AppBar'
import RepositoryList from './RepositoryList'
import { Route, Routes, Navigate, useMatch } from 'react-router-native'
import SignIn from './SignIn'
import RepositoryItemDetail from './RepositoryItem/RepositoryItemDetail'
import Review from './Review'
import SignUp from './SignUp'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
})

const Main = () => {
  const match = useMatch('/repositories/:id')
  const repoId = match ? match.params.id : null

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} exact />
        <Route path='/createReview' element={<Review />} exact />
        <Route
          path='/repositories/:id'
          element={<RepositoryItemDetail id={repoId} />}
          exact
        />
        <Route path='/signin' element={<SignIn />} exact />
        <Route path='/signup' element={<SignUp />} exact />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  )
}

export default Main
