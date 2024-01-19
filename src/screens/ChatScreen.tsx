import { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

import { ChatItem } from '../components/ChatItem'
import { CreateRoom } from '../components/CreateRoom'

import { roomsMock } from '../utils/roomsMock'

export default function ChatScreen() {
  const [modalOpen, setModalOpen] = useState(false)

  const { user } = useContext(AuthContext)
  const { rooms, getRooms, chatSocket } = useContext(ChatContext)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await getRooms()
  //   }

  //   fetchData()
  // }, [])

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.heading}>Bem vindo {user?.username}!</Text>
          <Pressable>
            <AntDesign name="logout" size={30} color={'black'} />
          </Pressable>
        </View>
      </View>
      <View style={styles.listContainer}>
        {roomsMock.length > 0 ? (
          <FlatList
            data={roomsMock}
            renderItem={({ item }) => <ChatItem item={item} />}
            keyExtractor={(item) => item.name.toString()}
          />
        ) : null}
      </View>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.button} onPress={() => setModalOpen(true)}>
          <View>
            <Text style={styles.button}>Criar uma sala</Text>
          </View>
        </Pressable>
      </View>
      {modalOpen && (
        <CreateRoom modalVisible={modalOpen} setModalVisible={setModalOpen} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: '#eee',
    flex: 1,
  },
  topContainer: {
    backgroundColor: '#fff',
    height: 70,
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    marginBottom: 15,
    flex: 0.3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  listContainer: {
    flex: 3.4,
    paddingHorizontal: 10,
  },
  bottomContainer: {
    flex: 0.3,
    padding: 10,
  },
  button: {
    backgroundColor: '#703efe',
    padding: 12,
    width: '100%',
    elevation: 1,
    borderRadius: 50,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
})
