const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export async function createCheckoutSession(planId, userId, userEmail) {
  try {
    const response = await fetch(`${API_URL}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan: planId,
        userId,
        userEmail
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }

    return response.json()
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

export async function getSubscriptionStatus(userId) {
  try {
    const response = await fetch(`${API_URL}/subscription-status/${userId}`)
    if (!response.ok) {
      throw new Error('Failed to get subscription status')
    }
    return response.json()
  } catch (error) {
    console.error('Error getting subscription status:', error)
    throw error
  }
} 