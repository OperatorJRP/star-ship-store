import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './StickyCartBar.styles'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../navigation/NavigationConstants'
import { useCartStore } from '../../store/useCartStore'

const StickyCartBar = () => {

  const navigation = useNavigation()
  const totalCount = useCartStore((s) => s.totalCount)

  if (!totalCount) return null

  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={styles.inner}>
        <Text style={styles.summary}>
          🛒 {totalCount} item{totalCount > 1 ? 's' : ''}
        </Text>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`View cart with ${totalCount} items`}
          style={styles.button}
          onPress={() => navigation.navigate(ROUTES.CART)}
        >
          <Text style={styles.buttonText}>View Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default StickyCartBar
