// Simple localStorage-based auth system
export interface User {
  id: string
  email: string
  credits: number
}

const USERS_KEY = 'ai_video_users'
const CURRENT_USER_KEY = 'ai_video_current_user'

function getUsers(): Record<string, User & { password: string }> {
  if (typeof window === 'undefined') return {}
  const stored = localStorage.getItem(USERS_KEY)
  return stored ? JSON.parse(stored) : {}
}

function saveUsers(users: Record<string, User & { password: string }>) {
  if (typeof window === 'undefined') return
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function signup(email: string, password: string): User | null {
  const users = getUsers()
  
  if (users[email]) {
    return null // User already exists
  }
  
  const user: User & { password: string } = {
    id: Date.now().toString(),
    email,
    password,
    credits: 100, // Sign up bonus
  }
  
  users[email] = user
  saveUsers(users)
  
  const { password: _, ...userWithoutPassword } = user
  setCurrentUser(userWithoutPassword)
  return userWithoutPassword
}

export function login(email: string, password: string): User | null {
  const users = getUsers()
  const user = users[email]
  
  if (!user || user.password !== password) {
    return null // Invalid credentials
  }
  
  const { password: _, ...userWithoutPassword } = user
  setCurrentUser(userWithoutPassword)
  return userWithoutPassword
}

export function setCurrentUser(user: User | null) {
  if (typeof window === 'undefined') return
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(CURRENT_USER_KEY)
  return stored ? JSON.parse(stored) : null
}

export function logout() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CURRENT_USER_KEY)
}

export function addCredits(userId: string, amount: number) {
  const users = getUsers()
  for (const email in users) {
    if (users[email].id === userId) {
      users[email].credits += amount
      saveUsers(users)
      const { password: _, ...userWithoutPassword } = users[email]
      setCurrentUser(userWithoutPassword)
      return userWithoutPassword
    }
  }
  return null
}

export function subtractCredits(userId: string, amount: number) {
  const users = getUsers()
  for (const email in users) {
    if (users[email].id === userId) {
      if (users[email].credits >= amount) {
        users[email].credits -= amount
        saveUsers(users)
        const { password: _, ...userWithoutPassword } = users[email]
        setCurrentUser(userWithoutPassword)
        return userWithoutPassword
      }
      return null // Not enough credits
    }
  }
  return null
}
