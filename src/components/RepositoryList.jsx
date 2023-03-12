import { FlatList, Pressable } from 'react-native'
import RepositoryItem from './RepositoryItem/Index'
import useRepositories from '../hooks/useRepositories'
import { useNavigate } from 'react-router-native'
import ItemSeparator from './common/ItemSeparator'

export const RepositoryListContainer = ({ repositories }) => {
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
    />
  )
}

const RepositoryList = () => {
  const { repositories } = useRepositories()
  return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList
