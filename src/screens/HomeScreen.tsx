import {
  Alert,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import homeImage from '../../assets/home-image.jpg'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
  const navigation = useNavigation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, user } = useContext(AuthContext)

  async function handleSignIn() {
    if (username.trim() !== '') {
      const isLogged = await signIn({ username, password })

      if (isLogged) {
        navigation.navigate('ChatScreen' as never)
        console.log('success on login')
      } else {
        Alert.alert('Erro no login')
      }
    } else {
      Alert.alert('User name field is empty')
    }

    Keyboard.dismiss()
  }

  useEffect(() => {
    if (user) {
      navigation.navigate('ChatScreen' as never)
    }
  }, [user, navigation])

  return (
    <View style={styles.mainWrapper}>
      <ImageBackground source={homeImage} style={styles.homeImage} />
      <View style={styles.content}>
        <View style={styles.infoBlock}>
          <View>
            <Text style={styles.heading}>--------- Login ---------</Text>
            <TextInput
              autoCorrect={false}
              placeholder="Enter your username"
              style={styles.loginInput}
              onChangeText={(value) => setUsername(value)}
              value={username}
              autoCapitalize="none"
            />
            <TextInput
              autoCorrect={false}
              placeholder="Enter your password"
              style={styles.loginInput}
              onChangeText={(value) => setPassword(value)}
              value={password}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Pressable onPress={() => handleSignIn()} style={styles.button}>
              <View>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  homeImage: {
    width: '100%',
    flex: 3,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  infoBlock: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 15,
    color: '#acacac',
    marginBottom: 15,
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
    width: '34%',
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
