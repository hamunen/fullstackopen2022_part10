import { Formik } from 'formik'
import { Pressable, StyleSheet, View } from 'react-native'
import theme from '../theme'
import FormikTextInput from './FormikTextInput'
import Text, { SubHeading } from './Text'
import * as yup from 'yup'
import { useNavigate } from 'react-router-native'
import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'
import { useState } from 'react'

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating needs to be a number!')
    .min(
      0,
      'Negative rating lol? Rating needs to be a number between 0 and 100'
    )
    .max(100, 'Too high! Rating needs to be a number between 0 and 100')
    .required('Rating is required'),
})

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: '',
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
  error: {
    color: 'red',
    textAlign: 'center',
  },
})

export const ReviewForm = ({ onSubmit, error }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='ownerName' placeholder='Repository owner name' />
      <FormikTextInput name='repositoryName' placeholder='Repository name' />
      <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
      <FormikTextInput
        name='review'
        placeholder='Review'
        multiline
        numberOfLines={4}
      />

      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <SubHeading style={styles.submitText}>Create a review</SubHeading>
      </Pressable>
      <Text style={styles.error}>{error}</Text>
    </View>
  )
}

export const ReviewFormContainer = ({ onSubmit, error }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <ReviewForm onSubmit={handleSubmit} error={error} />
      )}
    </Formik>
  )
}

const Review = () => {
  const navigate = useNavigate()
  const [createReview] = useMutation(CREATE_REVIEW)
  const [error, setError] = useState('')

  const onSubmit = async (values, { resetForm }) => {
    const { ownerName, repositoryName, rating, review: text } = values
    try {
      const result = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      })
      resetForm()
      if (result)
        navigate(`/repositories/${result.data.createReview.repository.id}`)
    } catch (e) {
      console.log(e)
      if (e.graphQLErrors) setError(e.graphQLErrors[0].message)
    }
  }

  return <ReviewFormContainer onSubmit={onSubmit} error={error} />
}

export default Review
