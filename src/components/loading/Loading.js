import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { colors } from '../../utils/Color'

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={'large'} color={colors.blue} />
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Loading
