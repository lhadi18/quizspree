import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null) // Null for anonymous users

  const login = (userData) => setUser(userData) // Login function
  const logout = () => setUser(null) // Logout function

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom Hook
export const useUser = () => useContext(UserContext)
