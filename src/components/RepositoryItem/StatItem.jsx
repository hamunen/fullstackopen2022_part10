import { View, StyleSheet } from 'react-native'
import Text, { SubHeading } from '../Text'

const styles = StyleSheet.create({
  stat: {
    padding: 3,
    textAlign: 'center',
  },
})

const StatItem = ({ value, text }) => {
  const formattedValue =
    value >= 1000 ? Math.round((value / 1000) * 10) / 10 + 'k' : value

  return (
    <View>
      <SubHeading style={styles.stat}>{formattedValue}</SubHeading>
      <Text color='textSecondary' style={styles.stat}>
        {text}
      </Text>
    </View>
  )
}

export default StatItem
