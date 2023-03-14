import { useApolloClient } from '@apollo/client'
import { useNavigate } from 'react-router'
import { useAuthStorage } from '../hooks/useAuthStorage'

const useSignOut = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const navigate = useNavigate()

  const signOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
    navigate('/')
    console.log('signed out')
  }

  return signOut
}

export default useSignOut
