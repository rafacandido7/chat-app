import axios, { AxiosResponse } from 'axios'
import { createContext, ReactNode, useContext, useState } from 'react'
import { io, Socket } from 'socket.io-client'

import { AuthContext } from './AuthContext'

import { IRoom } from '../interfaces/room.interface'
import { JoinRoomDto } from '../interfaces/dtos/joinRoom.dto'

interface ChatContextProps {
  getRooms: () => Promise<void>
  joinRoom: (joinRoomDto: JoinRoomDto) => void
  rooms: IRoom[]
  chatSocket: Socket
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
  const [rooms, setRooms] = useState([])

  const { user } = useContext(AuthContext)

  const chatSocket: Socket = io(baseURL, {
    query: {
      token: user?.access_token,
    },
  })

  async function getRooms(): Promise<void> {
    try {
      const response: AxiosResponse = await chatApi.get('/rooms')

      if (response.status !== 200) {
        throw new Error('Error finding rooms')
      }

      setRooms(response.data)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  function joinRoom(joinRoomDto: JoinRoomDto) {
    chatSocket.emit('joinRoom', joinRoomDto)
  }

  return (
    <Provider value={{ getRooms, rooms, joinRoom, chatSocket }}>
      {children}
    </Provider>
  )
}
