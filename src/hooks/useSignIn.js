import { useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations'

const useSignIn = () => {
  const [authenticate, result] = useMutation(AUTHENTICATE)

  const signIn = async ({ username, password }) => {
    return await authenticate({ variables: { username, password } })
  }

  return [signIn, result]
}

export default useSignIn
