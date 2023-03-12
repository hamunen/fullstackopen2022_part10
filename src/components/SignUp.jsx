import { Formik } from 'formik'
import { Pressable, StyleSheet, View } from 'react-native'
import theme from '../theme'
import FormikTextInput from './FormikTextInput'
import { SubHeading } from './Text'
import * as yup from 'yup'
import { useNavigate } from 'react-router-native'
import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required...')
    .max(30, 'Max 30 letters'),
  password: yup
    .string()
    .required("Dude, you'll need a password")
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Max 50 letters'),
  passwordConfirm: yup
    .string()
    .required('Please confirm the password')
    .oneOf([yup.ref('password'), null], "Passwords don't match"),
})

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
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

export const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <FormikTextInput
        name='passwordConfirm'
        placeholder='Password confirmation'
        secureTextEntry
      />

      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <SubHeading style={styles.submitText}>Sign up</SubHeading>
      </Pressable>
    </View>
  )
}

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignUp = () => {
  const navigate = useNavigate()
  const [signUp] = useSignUp()
  const [signIn] = useSignIn()

  const onSubmit = async (values, { resetForm }) => {
    const { username, password } = values
    try {
      await signUp({ username, password })
      resetForm()
      await signIn({ username, password })
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return <SignUpContainer onSubmit={onSubmit} />
}

export default SignUp
