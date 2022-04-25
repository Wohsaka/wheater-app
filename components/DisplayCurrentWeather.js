import { StyleSheet, Text, View, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

const DisplayWeather = (props) => {
  const iconUrl = 'http://openweathermap.org/img/wn/'
  if (props.current == undefined) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  } else if (props.current !== undefined) {
    return (
      <View style={styles.dataContainer}>
        <View style={styles.weatherContainer}>
          <Text style={styles.time}>
            {props.current.weather[0].description[0].toUpperCase() +
              props.current.weather[0].description.slice(1)}
          </Text>
          <View style={styles.tempContainer}>
            <Text style={styles.temp}>{parseInt(props.current.temp)}</Text>
            <Text style={styles.degrees}>°C</Text>
          </View>
        </View>
        <View style={styles.windContainer}>
          <Image
            style={styles.icon}
            source={{
              uri: iconUrl + props.current.weather[0].icon + '@4x.png',
            }}
          />
          <Text style={styles.speed}>
            <Feather name='wind' size={18} color='white' />
            {'  ' + props.current.wind_speed} m/s
          </Text>
          <Text style={styles.humidity}>
            <Entypo name='water' size={18} color='white' />
            {'  ' + props.current.humidity}%
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#7FC8F8',
    alignItems: 'flex-end',
    paddingBottom: 50,
    paddingLeft: 15,
  },
  weatherContainer: {
    flex: 1,
    alignItems: 'center',
  },
  windContainer: {
    flex: 0.7,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 40,
  },
  tempContainer: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  time: {
    fontSize: 25,
    color: 'white',
  },
  temp: {
    fontSize: 65,
    color: 'white',
  },
  degrees: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  speed: {
    fontSize: 18,
    color: 'white',
  },
  humidity: {
    fontSize: 18,
    color: 'white',
  },
  icon: {
    height: 100,
    width: 100,
  },
})

export default DisplayWeather
