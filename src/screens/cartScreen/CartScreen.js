import React, { useCallback, useMemo, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { styles } from './CartScreen.styles'
import StarShipCard, { DEFAULT_COST } from '../../components/starShipCard/StarShipCard'
import { useCartStore } from '../../store/useCartStore'
import Spacer from '../../components/spacer/Spacer'

const CartScreen = () => {
  const itemsObj = useCartStore((s) => s.items)
  const creditsToAED = useCartStore((s) => s.creditsToAED)
  const clearCart = useCartStore((s) => s.clearCart)
  const TAX_RATE = useCartStore((s) => s.TAX_RATE)

  const paymentMethod = useCartStore((s) => s.paymentMethod)
  const availablePaymentMethods = useCartStore((s) => s.availablePaymentMethods)
  const setPaymentMethod = useCartStore((s) => s.setPaymentMethod)

  const cartItems = useMemo(() => {
    return Object.keys(itemsObj).map((key) => {
      return itemsObj[key]
    })
  }, [itemsObj])

  const subtotalCredits = useMemo(() => {
    return cartItems.reduce((sum, it) => {
      const cost = Number(it?.cost_in_credits) || Number(DEFAULT_COST)
      if (!Number.isFinite(cost)) return sum
      return sum + cost * (it.qty || 0)
    }, 0)
  }, [cartItems])

  const taxCredits = subtotalCredits * TAX_RATE
  const totalCredits = subtotalCredits + taxCredits

  const subtotalAED = creditsToAED(subtotalCredits)
  const taxAED = creditsToAED(taxCredits)
  const totalAED = creditsToAED(totalCredits)

  const onPlaceOrder = useCallback(() => {
    if (cartItems.length === 0) {
      Alert.alert(
        'Cart is empty',
        'Add some starships before placing an order.'
      )
      return
    }
    clearCart()
    Alert.alert(
      'Order placed',
      `Your order was placed using ${
        paymentMethod === 'card' ? 'Card' : 'Cash'
      }.`
    )
  }, [cartItems, paymentMethod])

  const renderItem = useCallback(({ item }) => {
    return <StarShipCard ship={item} />
  }, [])

  const keyExtractor = useCallback((item) => item?.url || item?.name, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        ListHeaderComponent={<Spacer />}
        ItemSeparatorComponent={<Spacer />}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>
              Add some starships from the Home or Search tab.
            </Text>
          </View>
        }
        contentContainerStyle={
          cartItems.length === 0 ? styles.flatEmptyContainer : undefined
        }
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>

        <View style={styles.paymentRow}>
          {availablePaymentMethods?.map((item) => {
            return (
              <TouchableOpacity
                key={item}
                style={styles.radioRow}
                onPress={() => setPaymentMethod(item)}
              >
                <View
                  style={[
                    styles.radioCircle,
                    paymentMethod === item && styles.radioSelected,
                  ]}
                />
                <Text style={styles.radioLabel}>{item}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal (AED)</Text>
          <Text style={styles.summaryValue}>{subtotalAED.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Tax ({(TAX_RATE * 100).toFixed(0)}%)
          </Text>
          <Text style={styles.summaryValue}>{taxAED.toFixed(2)}</Text>
        </View>

        <View style={[styles.summaryRow, styles.summaryTotalRow]}>
          <Text style={styles.summaryTotalLabel}>Total</Text>
          <Text style={styles.summaryTotalValue}>{totalAED.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={onPlaceOrder}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CartScreen
