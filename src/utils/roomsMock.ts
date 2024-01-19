import { IRoom } from '../interfaces/room.interface'

export const roomsMock: IRoom[] = [
  {
    name: 'Room 1',
    users: [
      { name: 'User1', socketId: 'socket1' },
      { name: 'User2', socketId: 'socket2' },
    ],
    messages: [
      {
        message: 'Hello!',
        sentAt: new Date(),
        user: { name: 'User1', socketId: 'socket1' },
      },
      {
        message: 'Hi there!',
        sentAt: new Date(),
        user: { name: 'User2', socketId: 'socket2' },
      },
    ],
  },
  {
    name: 'Room 2',
    users: [
      { name: 'User3', socketId: 'socket3' },
      { name: 'User4', socketId: 'socket4' },
    ],
    messages: [
      {
        message: 'Welcome!',
        sentAt: new Date(),
        user: { name: 'User3', socketId: 'socket3' },
      },
      {
        message: 'Nice to see you!',
        sentAt: new Date(),
        user: { name: 'User4', socketId: 'socket4' },
      },
    ],
  },
  {
    name: 'Room 3',
    users: [
      { name: 'User5', socketId: 'socket5' },
      { name: 'User6', socketId: 'socket6' },
    ],
    messages: [
      {
        message: 'Greetings!',
        sentAt: new Date(),
        user: { name: 'User5', socketId: 'socket5' },
      },
      {
        message: 'How are you?',
        sentAt: new Date(),
        user: { name: 'User6', socketId: 'socket6' },
      },
    ],
  },
]
