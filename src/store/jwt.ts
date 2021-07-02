import { atom, WritableAtom } from 'jotai'
import { User } from '../types/User'

export const jwtAtom: WritableAtom<string | null, string | null> = atom(
  null,
  (_, set, value) => set(jwtAtom, value)
)

export const authHeaderAtom = atom((get) => {
  const jwt = get(jwtAtom)

  if (jwt) {
    return {
      Authorization: `Bearer ${jwt}`,
    }
  }

  return {}
})

export const userAtom: WritableAtom<User | null, User | null> = atom(
  null,
  (_, set, value) => set(userAtom, value)
)
