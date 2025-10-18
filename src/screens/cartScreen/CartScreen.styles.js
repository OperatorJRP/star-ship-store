import { StyleSheet } from 'react-native'
import { colors } from '../../utils/Color'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: colors.grey66,
  },

  flatEmptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.grey66,
    marginBottom: 6,
  },

  emptySubtitle: {
    fontSize: 14,
    color: colors.grey66,
    textAlign: 'center',
  },

  section: {
    marginTop: 12,
    marginBottom: 8,
    paddingVertical: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grey66,
    marginBottom: 8,
  },

  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },

  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.blue,
    marginRight: 8,
  },

  radioSelected: {
    backgroundColor: colors.blue,
  },

  radioLabel: {
    fontSize: 14,
    color: colors.grey66,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },

  summaryLabel: {
    fontSize: 14,
    color: colors.grey66,
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.grey66,
  },

  summaryTotalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.whitef9,
    paddingTop: 10,
    marginTop: 6,
  },

  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grey66,
  },

  summaryTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grey66,
  },

  footer: {
    paddingVertical: 12,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },

  placeOrderButton: {
    backgroundColor: colors.blue,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  placeOrderText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
})
