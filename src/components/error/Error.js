import { View, Text, Pressable, StyleSheet } from 'react-native'
import { colors } from '../../utils/Color'

const Error = ({ retry, errorMessage = 'Some Error Occured' }) => {
  return (
    <View style={styles.error}>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <Pressable style={styles.retry} onPress={retry}>
        <Text style={styles.retryText}>Retry</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retry: {
    backgroundColor: colors.blue,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 5,
  },
  retryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  errorMessage: {
    fontSize: 16,
    fontWeight: '500',
  },
})

export default Error
