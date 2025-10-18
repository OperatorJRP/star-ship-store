import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './StartShipCard.styles'
import { useCartStore } from '../../store/useCartStore'
import { memo, useCallback, useMemo } from 'react'
import { Image } from 'expo-image'

// In the Star Wars API (SWAPI), some starships have their cost listed as "unknown".
// To ensure consistent pricing and calculations in the app, we assign a default
// fallback cost value in credits. This prevents missing or invalid cost data
// from breaking UI components or cart calculations.
export const DEFAULT_COST = 100000

const StarShipCard = ({ ship }) => {
  const id = ship.url || ship.name
  const addItem = useCartStore((s) => s.addItem)
  const removeItem = useCartStore((s) => s.removeItem)
  const MAX_QTY = useCartStore((s) => s.MAX_QTY)
  const creditsToAED = useCartStore((s) => s.creditsToAED)
  const item = useCartStore((s) => s.items[id])

  const inCartQty = item?.qty || 0

  const costCredits = useMemo(() => {
    return ship.cost_in_credits === 'unknown'
      ? Number(DEFAULT_COST).toLocaleString()
      : Number(ship.cost_in_credits).toLocaleString()
  }, [])

  const costAED = useMemo(() => {
    return ship.cost_in_credits === 'unknown'
      ? creditsToAED(DEFAULT_COST).toFixed(2)
      : creditsToAED(Number(ship.cost_in_credits)).toFixed(2)
  }, [])

  const addItemToCart = useCallback(() => {
    addItem(ship, 1)
  }, [addItem])

  const removeItemFromCart = useCallback(() => {
    removeItem(ship, 1)
  }, [removeItem])

  return (
    <View style={styles.card}>
      <Image
        contentFit='cover'
        placeholder={require('../../../assets/starship.jpg')}
        transition={200}
        source={{
          uri: `https://picsum.photos/seed/${encodeURIComponent(
            ship.name
          )}/50/50`,
        }}
        style={styles.thumbnail}
      />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>{ship.name}</Text>
        <Text numberOfLines={1} style={styles.detail}>Cost (credits): {costCredits}</Text>
        <Text numberOfLines={1} style={styles.detail}>Cost (AED): {costAED}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            onPress={removeItemFromCart}
            style={[styles.qtyButton, inCartQty === 0 && styles.opacity]}
            disabled={inCartQty === 0}
          >
            <Text style={styles.qtyText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.qtyCount}>{inCartQty}</Text>

          <TouchableOpacity
            onPress={addItemToCart}
            style={[styles.qtyButton, inCartQty >= MAX_QTY && styles.opacity]}
            disabled={inCartQty >= MAX_QTY}
          >
            <Text style={styles.qtyText}>＋</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default memo(StarShipCard)
