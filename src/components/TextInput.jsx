import { TextInput as NativeTextInput, StyleSheet } from 'react-native'
import theme from '../theme'

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'gray',
    padding: 15,
    textColor: theme.colors.textPrimary,
  },
  error: {
    borderColor: theme.colors.error,
  },
})

// eslint-disable-next-line no-unused-vars
const TextInput = ({ error, ...props }) => {
  return (
    <NativeTextInput style={[styles.input, error && styles.error]} {...props} />
  )
}

export default TextInput
