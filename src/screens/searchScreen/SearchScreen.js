import React, { useCallback, useEffect, useRef } from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native'
import useSearchStore from '../../store/useSearchStore'
import StarShipCard from '../../components/starShipCard/StarShipCard'
import Loading from '../../components/loading/Loading'
import Error from '../../components/error/Error'
import { styles } from './SearchScreen.styles'
import { useNavigation } from '@react-navigation/native'
import Spacer from '../../components/spacer/Spacer'
import StickyCartBar from '../../components/stickyCartBar/StickyCartBar'
import { useCartStore } from '../../store/useCartStore'
import { colors } from '../../utils/Color'

const SearchScreen = () => {
  const inputRef = useRef()
  const navigation = useNavigation()

  const query = useSearchStore((s) => s.query)
  const results = useSearchStore((s) => s.results)
  const loading = useSearchStore((s) => s.loading)
  const loadingMore = useSearchStore((s) => s.loadingMore)
  const error = useSearchStore((s) => s.error)
  const loadMoreError = useSearchStore((s) => s.loadMoreError)
  const setQuery = useSearchStore((s) => s.setQuery)
  const loadMore = useSearchStore((s) => s.loadMore)
  const retry = useSearchStore((s) => s.retry)
  const clear = useSearchStore((s) => s.clear)

  const ListFooterComponent = useCallback(() => {
    const totalCount = useCartStore((s) => s.totalCount)
    if (loadMoreError) {
      return <Error errorMessage={loadMoreError} retry={loadMore} />
    }
    if (!loadingMore) return <Spacer space={totalCount > 0 ? 92 : 30} />
    return <ActivityIndicator size={'large'} color={colors.blue} />
  }, [loadMoreError, loadingMore])

  const RenderEmpty = useCallback(() => {
    if (loading) return null
    const isQueryEmpty = !query.trim()
    const title = isQueryEmpty ? 'Search Starships' : 'No Results Found'
    const subtitle = isQueryEmpty
      ? 'Type something above to explore the galaxy’s finest ships 🚀'
      : `Couldn’t find any ships for "${query}".`

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTextTitle}>{title}</Text>
        <Text style={styles.emptyTextSubtitle}>{subtitle}</Text>
      </View>
    )
  }, [query, loading])

  const renderItem = useCallback(({ item }) => {
    return <StarShipCard ship={item} />
  }, [])

  const keyExtractor = useCallback((item) => {
    return item.url
  })

  const onEndReached = useCallback(() => {
    loadMore()
  }, [loadMore])

  const onChangeText = useCallback(
    (text) => {
      setQuery(text)
    },
    [setQuery]
  )

  useEffect(() => {
    const onFocus = () => {
      setTimeout(() => inputRef.current?.focus(), 80)
    }

    const unsubscribeFocus = navigation.addListener('focus', onFocus)
    const unsubscribeBlur = navigation.addListener('blur', () => {
      inputRef.current?.blur()
      clear()
    })

    return () => {
      unsubscribeFocus()
      unsubscribeBlur()
    }
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          ref={inputRef}
          placeholder="Search starships..."
          value={query}
          onChangeText={onChangeText}
          style={styles.searchInput}
        />
      </View>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error errorMessage={error} retry={retry} />
      ) : results?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={results}
          keyboardShouldPersistTaps={'handled'}
          ListHeaderComponent={<Spacer />}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={onEndReached}
          ListFooterComponent={ListFooterComponent}
          ItemSeparatorComponent={<Spacer />}
          bounces={false}
        />
      ) : (
        <RenderEmpty />
      )}
      <StickyCartBar />
    </View>
  )
}

export default SearchScreen
