import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../graphql/mutations'

const useSignUp = () => {
  const [signupMutation, signupResult] = useMutation(CREATE_USER)

  const signUp = async ({ username, password }) => {
    await signupMutation({
      variables: {
        user: {
          username,
          password,
        },
      },
    })

    console.log('signed up')
  }

  return [signUp, signupResult]
}

export default useSignUp
