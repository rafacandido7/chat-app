import { StatusBar } from 'expo-status-bar'
import HomeScreen from './src/screens/HomeScreen'
import ChatScreen from './src/screens/ChatScreen'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AuthProvider } from './src/context/AuthContext'
import { ChatProvider } from './src/context/ChatContext'
import MessageScreen from './src/screens/MessageScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChatScreen"
              component={ChatScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MessageScreen"
              component={MessageScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar hidden={true} />
      </ChatProvider>
    </AuthProvider>
  )
}
