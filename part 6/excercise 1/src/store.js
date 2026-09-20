import { create } from 'zustand'

// Flux-like reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: state.good + 1 }
    case 'NEUTRAL':
      return { ...state, neutral: state.neutral + 1 }
    case 'BAD':
      return { ...state, bad: state.bad + 1 }
    case 'ZERO':
      return { good: 0, neutral: 0, bad: 0 }
    default:
      return state
  }
}

const useStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  dispatch: (action) => set((state) => reducer(state, action)),
}))

export default useStore
