import { StyleSheet } from 'react-native'
import { colors } from '../../utils/Color'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },

  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.grey66,
  },

  searchInput: {
    backgroundColor: colors.whitef9,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.blue,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
  },

  emptyImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },

  emptyTextTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.grey66,
    marginBottom: 4,
  },

  emptyTextSubtitle: {
    fontSize: 14,
    color: colors.grey66,
    textAlign: 'center',
  },

  footerContainer: {
    padding: 12,
    alignItems: 'center',
  },
})
