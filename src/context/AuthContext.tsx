import { createContext, ReactNode, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { IUser } from '../interfaces/user.interface'
import UserLoginDto from '../interfaces/dtos/userLogin.dto'

interface AuthContextProps {
  signIn: (credentials: UserLoginDto) => Promise<boolean>
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
  const [user, setUser] = useState<IUser | undefined>(undefined)

  async function signIn({
    username,
    password,
  }: UserLoginDto): Promise<boolean> {
    try {
      const response: AxiosResponse = await authApi.post('/auth/login', {
        username,
        password,
      })

      if (response.data.statusCode !== 201) {
        throw new Error('Error on login')
      }

      const { access_token } = response.data.data

      const userInfo: AxiosResponse = await authApi.get('/users/me', {
        headers: { Authorization: `Bearer ${access_token}` },
      })

      const { _id } = userInfo.data.data

      setUser({ username, password, id: _id, access_token })

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  return <Provider value={{ signIn, user }}>{children}</Provider>
}
