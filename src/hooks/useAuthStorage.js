import { createContext } from 'react'
import { useContext } from 'react'

const AuthStorageContext = createContext()

export const useAuthStorage = () => {
  return useContext(AuthStorageContext)
}

// ok i dont understand, we have the same export in the context file
// should we replace the Context file with this? -> yes i think so
export default AuthStorageContext
