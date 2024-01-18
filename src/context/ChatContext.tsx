import { createContext, ReactNode, useContext } from 'react'
import { io, Socket } from 'socket.io-client'
import { AuthContext } from './AuthContext'
import axios, { AxiosResponse } from 'axios'

interface ChatContextProps {
  getRooms: () => Promise<void>
}

export const ChatContext = createContext<ChatContextProps>(
  {} as ChatContextProps,
)

interface ChatProviderProps {
  children: ReactNode
}

const { Provider } = ChatContext

const baseURL = 'http://localhost:3003'

const chatApi = axios.create({
  baseURL,
})

export function ChatProvider({ children }: ChatProviderProps) {
  const { accessToken } = useContext(AuthContext)

  const chatSocket: Socket = io(baseURL, {
    query: {
      token: accessToken,
    },
  })

  async function getRooms(): Promise<void> {
    try {
      const response: AxiosResponse = await chatApi.get('/rooms')

      if (response.data.statusCode !== 200) {
        throw new Error('Error finding rooms')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return <Provider value={{ getRooms }}>{children}</Provider>
}
