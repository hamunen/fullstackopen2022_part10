import { Formik } from 'formik'
import { Pressable, StyleSheet, View } from 'react-native'
import theme from '../theme'
import FormikTextInput from './FormikTextInput'
import { SubHeading } from './Text'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'

// ...

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required...'),
  password: yup.string().required('Dude, you need a password to sign in'),
})

const initialValues = {
  username: '',
  password: '',
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 10,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    margin: 7,
    borderRadius: 3,
  },
  submitText: {
    color: 'white',
    textAlign: 'center',
  },
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <SubHeading style={styles.submitText}>Sign in</SubHeading>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()

  const onSubmit = async (values, { resetForm }) => {
    const { username, password } = values
    try {
      const { data } = await signIn({ username, password })
      console.log(data)
      resetForm()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
