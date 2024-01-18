import { createContext, ReactNode, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { IUser } from '../interfaces/user.interface'

interface AuthContextProps {
  accessToken: string | undefined
  signIn: (credentials: {
    username: string
    password: string
  }) => Promise<boolean>
  user: IUser | undefined
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
)

interface AuthProviderProps {
  children: ReactNode
}

const { Provider } = AuthContext

export const authApi = axios.create({
  baseURL: 'https://api-cicm.7itec.io/cicm-homologation',
  headers: {
    'origin-platform': 'Mobile',
  },
})

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined)
  const [user, setUser] = useState<IUser | undefined>(undefined)

  async function signIn({ username, password }: IUser): Promise<boolean> {
    try {
      const response: AxiosResponse = await authApi.post('/auth/login', {
        username: username.toLowerCase(),
        password,
      })

      if (response.data.statusCode !== 201) {
        throw new Error('Error on login')
      }

      const { access_token } = response.data.data

      setAccessToken(access_token)
      setUser({ username, password })

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  return <Provider value={{ accessToken, signIn, user }}>{children}</Provider>
}
