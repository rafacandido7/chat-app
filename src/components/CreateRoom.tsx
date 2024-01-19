import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Keyboard,
} from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

interface ICreateRoomProps {
  modalVisible: boolean
  setModalVisible: Dispatch<SetStateAction<boolean>>
}

export function CreateRoom({
  modalVisible,
  setModalVisible,
}: ICreateRoomProps) {
  const [roomName, setRoomName] = useState('')

  const { user } = useContext(AuthContext)
  const { joinRoom, getRooms } = useContext(ChatContext)

  async function handleCreateNewRoom() {
    // socket.emit('createNewGroup', roomName)
    console.log(roomName)
    console.log({ user })
    const rooms = await getRooms()

    console.log({ rooms })
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // joinRoom({ username: user!.username, roomName, externalId: user!.id })

    setRoomName('')
    setModalVisible(false)
    Keyboard.dismiss()
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
        setModalVisible(!modalVisible)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            autoCorrect={false}
            placeholder="Insira o nome da sala"
            style={styles.loginInput}
            onChangeText={(value) => setRoomName(value)}
            value={roomName}
          />
          <View style={styles.buttonWrapper}>
            <Pressable onPress={handleCreateNewRoom} style={styles.button}>
              <View>
                <Text style={styles.buttonText}>Criar</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.button}
            >
              <View>
                <Text style={styles.buttonText}>Cancelar</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  loginInput: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 8,
  },
  button: {
    backgroundColor: '#703efe',
    padding: 15,
    marginVertical: 10,
    elevation: 1,
    borderRadius: 50,
  },
  buttonWrapper: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
})
