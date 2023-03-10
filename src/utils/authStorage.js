import AsyncStorage from '@react-native-async-storage/async-storage'

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace
  }

  getAccessToken = async () =>
    await AsyncStorage.getItem(`${this.namespace}:accessToken`)

  setAccessToken = async (accessToken) =>
    await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken)

  removeAccessToken = async () =>
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`)
}

export default AuthStorage
