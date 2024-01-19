import { ApiUser } from './api-user.interface'
import { IMessage } from './message.interface'

export interface IRoom {
  name: string
  users: ApiUser[]
  messages: IMessage[]
}
