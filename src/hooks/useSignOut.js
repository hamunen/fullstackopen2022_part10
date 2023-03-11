import { useApolloClient } from '@apollo/client'
import { useAuthStorage } from '../hooks/useAuthStorage'

const useSignOut = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const signOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
    console.log('signed out')
  }

  return signOut
}

export default useSignOut
