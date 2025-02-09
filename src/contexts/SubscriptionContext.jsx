import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { getSubscriptionStatus } from '../services/subscription'

const SubscriptionContext = createContext()

export function useSubscription() {
  return useContext(SubscriptionContext)
}

export function SubscriptionProvider({ children }) {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchSubscription() {
      if (!user) {
        setSubscription(null)
        setLoading(false)
        return
      }

      try {
        const data = await getSubscriptionStatus(user.uid)
        setSubscription(data)
      } catch (error) {
        console.error('Error fetching subscription:', error)
        setError('Failed to load subscription status')
        setSubscription({
          tier: 'free',
          projectLimit: 3
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()
  }, [user])

  const value = {
    subscription,
    loading,
    error,
    refreshSubscription: () => setLoading(true)
  }

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
} 