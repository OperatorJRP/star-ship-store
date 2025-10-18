import { create } from 'zustand'
import { API_URL } from '../api/ApiConstants'

const initialState = {
  query: '',
  results: [],
  next: null,
  loading: false,
  loadingMore: false,
  error: '',
  loadMoreError: '',
  _abortController: null,
  _debounceId: null,
}

const useSearchStore = create((set, get) => ({
  ...initialState,

  setQuery: (q) => {

    const prevTimer = get()._debounceId
    if (prevTimer) clearTimeout(prevTimer)

    set({ query: q, loading: true })

    if (q && q.length > 0) {
      const id = setTimeout(() => {
        get().fetchSearch(q)
        set({ _debounceId: null })
      }, 300)

      set({ _debounceId: id })
    } else {
      get().clear()
    }
  },

  fetchSearch: async (q = '') => {

    if(!q.trim()){
      set({loading:false})
      return
    }

    try {
      const prev = get()._abortController
      if (prev) prev.abort()

      const controller = new AbortController()
      set({
        _abortController: controller,
        loading: true,
        error: '',
        loadMoreError: '',
      })

      const url = q ? `${API_URL}?search=${encodeURIComponent(q)}` : API_URL
      const res = await fetch(url, { signal: controller.signal })
      const data = await res.json()
      set({
        results: data.results || [],
        next: data.next || null,
        loading: false,
        error: '',
        _abortController: null,
      })
    } catch (err) {
      if (err.name === 'AbortError') {
        return
      }
      set({
        loading: false,
        error: 'Search failed. Please try again.',
        _abortController: null,
      })
    }
  },

  loadMore: async () => {
    const { next, results } = get()
    if (!next) return

    try {
      set({ loadingMore: true, loadMoreError: '' })

      const res = await fetch(next)
      const data = await res.json()

      set({
        results: [...results, ...(data.results || [])],
        next: data.next || null,
        loadingMore: false,
      })
    } catch (err) {
      set({
        loadingMore: false,
        loadMoreError: 'Failed to load more results.',
      })
    }
  },

  clear: () => {
    const prev = get()._abortController
    if (prev) prev.abort()
    const prevTimer = get()._debounceId
    if (prevTimer) clearTimeout(prevTimer)
    set({ ...initialState })
  },

  retry: async () => {
    const q = get().query
    await get().fetchSearch(q)
  },
}))

export default useSearchStore
