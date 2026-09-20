import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotify = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotify must be used within NotificationContextProvider')
  }
  const [notification, dispatch] = context

  const notifyWithTimeout = (message, timeoutSeconds = 5) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: message })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, timeoutSeconds * 1000)
  }

  return { notification, notify: notifyWithTimeout }
}

export default NotificationContext
