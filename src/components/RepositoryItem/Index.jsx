import { View, StyleSheet, Image } from 'react-native'
import theme from '../../theme'
import Text, { SubHeading } from '../Text'
import StatItem from './StatItem'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '3%',
    flexGrow: 0,
    margin: 10,
  },
  mainInfoContainer: {
    display: 'flex',
    flexGrow: 1,
    padding: 10,
  },
  mainInfoContent: {
    padding: 2,
  },
  descriptionContainer: {
    flexDirection: 'row',
  },
  description: {
    flex: 1,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  languageBox: {
    backgroundColor: theme.colors.primary,
    borderRadius: '3%',
    padding: 4,
  },
  languageText: {
    color: 'white',
  },
  statItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})

const RepositoryItem = ({ item }) => (
  <View style={styles.container}>
    <View style={styles.topContainer}>
      <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.mainInfoContainer}>
        <SubHeading style={[styles.mainInfoContent]}>
          {item.fullName}
        </SubHeading>
        <View style={[styles.mainInfoContent, styles.descriptionContainer]}>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={[styles.mainInfoContent, styles.languageContainer]}>
          <View style={styles.languageBox}>
            <Text style={styles.languageText}>{item.language}</Text>
          </View>
        </View>
      </View>
    </View>

    <View style={styles.statItemContainer}>
      <StatItem value={item.stargazersCount} text={'Stars'} />
      <StatItem value={item.forksCount} text={'Forks'} />
      <StatItem value={item.reviewCount} text={'Reviews'} />
      <StatItem value={item.ratingAverage} text={'Rating'} />
    </View>
  </View>
)

export default RepositoryItem
