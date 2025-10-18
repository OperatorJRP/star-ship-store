import { create } from 'zustand'
import { API_URL } from '../api/ApiConstants'

const initialState = {
  results: [],
  next: null,
  loading: false,
  error: '',
  loadingMore: false,
  loadMoreError: '',
}

export const useHomeStore = create((set, get) => ({
  ...initialState,

  fetchStarShips: async () => {
    set((state) => ({ ...state, loading: true }))
    try {
      let res = await fetch(API_URL)
      let data = await res?.json()
      set({
        results: data.results || [],
        next: data.next || null,
        loading: false,
        error: '',
      })
    } catch (error) {
      set((state) => ({ ...state, error: error, loading: false }))
    }
  },

  loadMore: async () => {
    const { next, results } = get()
    if (!next) return

    set({ loadingMore: true })

    try {
      let res = await fetch(next)
      let data = await res?.json()

      set({
        next: data?.next || null,
        results: [...results, ...(data?.results || [])],
        loadingMore: false,
        loadMoreError: '',
      })
    } catch (error) {
      set({ loadingMore: false, loadMoreError: error })
    }
  },

  clear: () => set({ ...initialState }),
}))
