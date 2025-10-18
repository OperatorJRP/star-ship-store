import { View, ActivityIndicator, FlatList } from 'react-native'
import { useCallback, useEffect } from 'react'
import { useHomeStore } from '../../store/useHomeStore'
import { styles } from './HomeScreen.styles'
import Loading from '../../components/loading/Loading'
import StarShipCard from '../../components/starShipCard/StarShipCard'
import Error from '../../components/error/Error'
import Spacer from '../../components/spacer/Spacer'
import StickyCartBar from '../../components/stickyCartBar/StickyCartBar'
import { colors } from '../../utils/Color'
import { useCartStore } from '../../store/useCartStore'

const HomeScreen = () => {
  const {
    results,
    loading,
    loadingMore,
    error,
    loadMoreError,
    fetchStarShips,
    loadMore,
  } = useHomeStore()

  useEffect(() => {
    fetchStarShips()
  }, [])

  const renderItem = useCallback(({ item }) => {
    return <StarShipCard ship={item} />
  }, [])

  const keyExtractor = useCallback((item) => {
    return item.url
  })

  const onEndReached = useCallback(() => {
    loadMore()
  }, [])

  const ListFooterComponent = useCallback(() => {
    
    const totalCount = useCartStore((s)=> s.totalCount)
    if (loadMoreError) {
      return <Error errorMessage="Some Error Occured" retry={loadMore} />
    }
    if (!loadingMore) return <Spacer space={ totalCount > 0 ? 92 : 30} />
    return <ActivityIndicator size={'large'} color={colors.blue} />
  }, [loadMoreError, loadingMore])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error errorMessage={'Failed To Load Data'} retry={fetchStarShips} />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Spacer />}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        ListFooterComponent={ListFooterComponent}
        ItemSeparatorComponent={<Spacer />}
        bounces={false}
      />
      <StickyCartBar/>
    </View>
  )
}

export default HomeScreen
