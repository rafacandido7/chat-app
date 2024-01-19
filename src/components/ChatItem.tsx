import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { IRoom } from '../interfaces/room.interface'
import { useNavigation } from '@react-navigation/native'

export function ChatItem({ item }: { item: IRoom }) {
  const { name } = item
  console.log({ name })
  const navigation = useNavigation()

  function handleNavigateToMessageScreen() {
    // navigation.navigate('MessageScreen', { roomName: name })
  }

  return (
    <Pressable style={styles.chat} onPress={handleNavigateToMessageScreen}>
      <View style={styles.circle}>
        <FontAwesome name="group" size={24} color={'black'} />
      </View>
      <View style={styles.rightContainer}>
        <View>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.message}>Entrar</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  chat: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    height: 80,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    opacity: 0.8,
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  time: {
    opacity: 0.6,
  },
  circle: {
    width: 50,
    borderRadius: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginRight: 10,
  },
})
