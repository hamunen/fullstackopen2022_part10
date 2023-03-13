import { FlatList, Pressable, StyleSheet, View, Platform } from 'react-native'
import RepositoryItem from './RepositoryItem/Index'
import useRepositories, {
  SORT_REPOSITORIES_HIGHEST_RATED,
  SORT_REPOSITORIES_LATEST,
  SORT_REPOSITORIES_LOWEST_RATED,
} from '../hooks/useRepositories'
import { useNavigate } from 'react-router-native'
import ItemSeparator from './common/ItemSeparator'
import { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { Chevron } from 'react-native-shapes'

const styles = StyleSheet.create({
  picker: {
    iconContainer: {
      top: 5,
      right: 5,
    },
  },
  pickerContainer: {
    padding: 15,
  },
})

const SortOrderPicker = ({ sortOrder, setSortOrder }) => {
  return (
    <View style={styles.pickerContainer}>
      <RNPickerSelect
        style={styles.picker}
        placeholder={{}}
        value={sortOrder}
        // annoying, triggers fetch before done is pressed on ios...
        onValueChange={(value) => setSortOrder(value)}
        items={[
          { label: 'Latest repositories', value: SORT_REPOSITORIES_LATEST },
          {
            label: 'Highest rated repositories',
            value: SORT_REPOSITORIES_HIGHEST_RATED,
          },
          {
            label: 'Lowest rated repositories',
            value: SORT_REPOSITORIES_LOWEST_RATED,
          },
        ]}
        Icon={() => Platform.OS === 'ios' && <Chevron />}
      />
    </View>
  )
}

export const RepositoryListContainer = ({
  repositories,
  sortOrder,
  setSortOrder,
}) => {
  // not pure anymore?
  const navigate = useNavigate()

  return (
    <FlatList
      data={repositories}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ListHeaderComponent={() => (
        <SortOrderPicker sortOrder={sortOrder} setSortOrder={setSortOrder} />
      )}
    />
  )
}

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState(SORT_REPOSITORIES_LATEST)
  const { repositories } = useRepositories(sortOrder)

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
    />
  )
}

export default RepositoryList
