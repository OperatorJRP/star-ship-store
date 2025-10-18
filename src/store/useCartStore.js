import { create } from 'zustand'

const initialState = {
  items: {},
  totalCount: 0,
  CREDITS_PER_AED: 10000,
  MAX_QTY: 5,
  TAX_RATE: 0.05,
  paymentMethod: 'card',
  availablePaymentMethods: ['card', 'cash'],
}

export const useCartStore = create((set, get) => ({
  ...initialState,

  addItem: (item, qty = 1) => {
    if (!item) return
    const items = get().items
    const MAX_QTY = get().MAX_QTY
    const id = item?.url || item?.name
    const currentQty = items[id]?.qty || 0
    if (currentQty + qty <= MAX_QTY) {
      set((state) => {
        return {
          items: {
            ...state.items,
            [id]: { ...item, qty: currentQty + qty },
          },
          totalCount: state.totalCount + qty,
        }
      })
    }
  },

  removeItem: (item, qty = 1) => {
    if (!item) return
    const id = item?.url || item?.name
    const items = get().items
    if (id in items) {
      const currentQty = items[id]?.qty || 0
      const newQty = Math.max(0, currentQty - qty)
      set((state) => {
        let newState = {
          items: {
            ...state.items,
            [id]: { ...item, qty: newQty },
          },
          totalCount: Math.max(0 , state.totalCount - qty),
        }
        if (newQty == 0) {
          delete newState.items[id]
        }
        return newState
      })
    }
  },

  creditsToAED: (credits) => {
    const c = Number(credits)
    if (!Number.isFinite(c)) return 0
    return c / get().CREDITS_PER_AED
  },

  clearCart: () => set({ ...initialState }),

  setPaymentMethod: (method) =>
    set((state) => {
      const allowed = state.availablePaymentMethods || []
      if (!allowed.includes(method)) return state
      return { paymentMethod: method }
    }) 
}))
