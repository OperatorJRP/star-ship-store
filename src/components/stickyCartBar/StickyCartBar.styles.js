import { StyleSheet } from 'react-native'
import { colors } from '../../utils/Color'

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 18, 
    zIndex: 50,
    elevation: 10
  },

  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.blue,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },

  summary: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },

  button: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
  },

  buttonText: {
    color: colors.blue,
    fontWeight: '700',
    fontSize: 14,
  },
})
