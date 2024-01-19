import { ApiUser } from './api-user.interface'

export interface IMessage {
  message: string
  sentAt: Date
  user: ApiUser
}
