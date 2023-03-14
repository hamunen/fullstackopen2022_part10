import { FlatList, Pressable, StyleSheet, View, Platform } from 'react-native'
import RepositoryItem from './RepositoryItem/Index'
import useRepositories, {
  SORT_REPOSITORIES_HIGHEST_RATED,
  SORT_REPOSITORIES_LATEST,
  SORT_REPOSITORIES_LOWEST_RATED,
} from '../hooks/useRepositories'
import { useNavigate } from 'react-router-native'
import ItemSeparator from './common/ItemSeparator'
import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { Chevron } from 'react-native-shapes'
import { Searchbar } from 'react-native-paper'
import { useDebouncedCallback } from 'use-debounce'

const REPOSITORIES_FETCH_AMOUNT = 5

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
  search: {
    backgroundColor: 'white',
    borderRadius: '3%',
    marginTop: 10,
    marginHorizontal: 10,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
})

const Search = ({ searchKeyword, setSearchKeyword }) => {
  const [text, setText] = useState(searchKeyword)
  const debounced = useDebouncedCallback((value) => {
    setSearchKeyword(value)
  }, 500)

  const onChange = (value) => {
    setText(value)
    debounced(value)
  }

  return (
    <Searchbar
      placeholder='Search'
      onChangeText={onChange}
      value={text}
      style={styles.search}
    />
  )
}

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

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props

    return (
      <>
        <Search
          searchKeyword={props.searchKeyword}
          setSearchKeyword={props.setSearchKeyword}
        />
        <SortOrderPicker
          sortOrder={props.sortOrder}
          setSortOrder={props.setSortOrder}
        />
      </>
    )
  }

  render() {
    const props = this.props

    return (
      <FlatList
        data={props.repositories}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => props.navigate(`/repositories/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        ListHeaderComponent={this.renderHeader}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.2}
      />
    )
  }
}

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState(SORT_REPOSITORIES_LATEST)
  const [searchKeyword, setSearchKeyword] = useState('')

  const { repositories, fetchMore } = useRepositories(
    sortOrder,
    searchKeyword,
    REPOSITORIES_FETCH_AMOUNT
  )
  const navigate = useNavigate()

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      navigate={navigate}
      onEndReach={onEndReach}
    />
  )
}

export default RepositoryList
