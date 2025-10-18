import { StyleSheet } from 'react-native'
import { colors } from '../../utils/Color'

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.whitef9,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.grey66,
  },

  thumbnail: {
    width: 120,
    height: '100%',
  },

  info: {
    flex: 1,
    padding: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },

  detail: {
    color: colors.grey66,
    fontSize: 13,
    marginTop: 4,
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  qtyButton: {
    backgroundColor: colors.blue,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  qtyText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },

  qtyCount: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },

  opacity: {
    opacity: 0.4,
  },
})
