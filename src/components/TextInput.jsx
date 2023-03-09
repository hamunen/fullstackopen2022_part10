import { TextInput as NativeTextInput, StyleSheet } from 'react-native'
import theme from '../theme'

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'gray',
    padding: 15,
    margin: 7,
    textColor: theme.colors.textPrimary,
  },
})

// eslint-disable-next-line no-unused-vars
const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style]

  return <NativeTextInput style={[styles.input, textInputStyle]} {...props} />
}

export default TextInput
