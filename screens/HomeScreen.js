import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import DisplayWeather from '../components/DisplayWeather'
import PermissionsModal from '../components/PermissionsModal'
import SearchModal from '../components/SearchModal'
import * as Location from 'expo-location'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome } from '@expo/vector-icons'

const apiKey = '6c21d78a28bcb8b1cab07871ef2fcb09'
const climateApi = 'https://api.openweathermap.org/data/2.5/onecall?'
const geoCodeApi = 'http://api.openweathermap.org/geo/1.0/direct?q='

const getClimateFromApi = async (location) => {
  try {
    const url = `${climateApi}lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${apiKey}`
    return fetch(url).then((response) => response.json())
  } catch (error) {
    console.error(error)
  }
}

export default function HomeScreen() {
  const [weatherData, setWeatherData] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [searchResult, setSearchResult] = useState(0)

  const getCoords = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@coords')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (error) {
      console.error(error)
    }
  }

  const saveCoords = async (coords) => {
    try {
      await AsyncStorage.setItem('@coords', coords)
    } catch (error) {
      console.error(error)
    }
  }

  const geoCode = (cityAux, countryAux) => {
    const geoUrl = `${geoCodeApi}${cityAux},${countryAux}&limit=10&appid=${apiKey}`
    return fetch(geoUrl).then((response) => response.json())
  }

  const handleOnSelectCity = (coords) => {
    getClimateFromApi(coords).then((res) => setWeatherData(res))
    saveCoords(JSON.stringify(coords))
    setSearchVisible(false)
    setSearchResult(0)
  }

  const handleSearch = async () => {
    try {
      if (inputValue == '') {
        alert('City name can not be empty')
        return null
      }
      const [cityTemp, countryTemp] = inputValue.split(',')
      setInputValue('')
      const cities = await geoCode(cityTemp, countryTemp)
      setSearchResult(cities)
    } catch (error) {
      console.error(error)
    }
  }

  const handleOnChangeText = (text) => {
    setInputValue(text)
  }

  const triggerModal = () => {
    setModalVisible(!modalVisible)
  }

  const triggerSearch = () => {
    setSearchVisible(true)
    setModalVisible(false)
  }

  const requestPermissions = async () => {
    let { status } = await Location.getForegroundPermissionsAsync()
    if (status == 'granted') {
      const loc = await Location.getCurrentPositionAsync()
      getClimateFromApi(loc.coords).then((res) => setWeatherData(res))
      return
    } else if (status != 'granted') {
      const coords = await getCoords()

      if (coords != null) {
        getClimateFromApi(coords).then((res) => setWeatherData(res))
        return
      }
    }
    //Solo se ejecuta si no hay permisos y no hay coordenadas guardadas
    //O se llama a esta funcion desde PermissionsModal
    status = await Location.requestForegroundPermissionsAsync()
    if (status == 'granted') {
      setModalVisible(false)
      const loc = await Location.getCurrentPositionAsync()
      getClimateFromApi(loc.coords).then((res) => setWeatherData(res))
      return
    } else if (status != 'granted') {
      setModalVisible(true)
    }
  }

  useEffect(async () => {
    await requestPermissions()
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome name='gear' size={25} color='#F9F9F9' />
      </TouchableOpacity>
      <DisplayWeather data={weatherData} />
      <PermissionsModal
        visible={modalVisible}
        requestPermissions={requestPermissions}
        triggerSearch={triggerSearch}
        triggerModal={triggerModal}
      />
      <SearchModal
        visible={searchVisible}
        inputValue={inputValue}
        onChangeText={handleOnChangeText}
        onSearch={handleSearch}
        searchResult={searchResult}
        onSelectCity={handleOnSelectCity}
      />
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 32,
    right: 32,
    zIndex: 1,
    padding: 2,
  },
})
