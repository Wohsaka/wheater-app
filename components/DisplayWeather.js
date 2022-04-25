import { StyleSheet, View, Text } from 'react-native'
import DisplayCurrentWeather from './DisplayCurrentWeather'
import DisplayHourlyWeather from './DisplayHourlyWeather'
import DisplayDailyWeather from './DisplayDailyWeather'

const DisplayWeather = (props) => {
  if (props.data !== undefined) {
    return (
      <View style={styles.container}>
        <DisplayCurrentWeather current={props.data.current} />
        <DisplayHourlyWeather hourly={props.data.hourly} />
        <DisplayDailyWeather daily={props.data.daily} />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7FC8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default DisplayWeather
