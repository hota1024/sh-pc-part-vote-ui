import axios from 'axios'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { client } from '../client/client'
import { authHeaderAtom, userAtom } from '../store/jwt'
import { User } from '../types/User'

/**
 * AuthState type.
 */
export type AuthState = {
  jwtChecking: boolean
  user: User | null
}

/**
 * use jwt authentication.
 */
export const useAuth = (): AuthState => {
  const [jwtChecking, setJwtChecking] = useState(true)
  const [headers] = useAtom(authHeaderAtom)
  const [user, setUser] = useAtom(userAtom)

  const check = async () => {
    try {
      const { data: user } = await client.get<User>('/auth/me', { headers })
      setUser(user)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.code === '401') {
          setUser(null)
        }
      }
    } finally {
      setJwtChecking(false)
    }
  }

  useEffect(() => {
    check()
  }, [])

  return {
    jwtChecking,
    user,
  }
}
