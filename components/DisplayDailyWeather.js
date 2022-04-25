import { View, StyleSheet, FlatList, Text } from 'react-native'
import { useEffect, useState } from 'react'
import DisplayDay from './DisplayDay'

const DisplayWeeklyWeather = (props) => {
  const [dailyWeather, setDailyWeather] = useState([{ Loading: 'Loading' }])
  const weekDay = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  useEffect(() => {
    if (props.daily !== undefined) {
      const nextDays = props.daily.slice(0, 5)
      let days = []
      nextDays.forEach((day) => {
        const date = new Date(day.dt * 1000)
        days.push({
          day: weekDay[date.getDay()],
          icon: day.weather[0].icon,
          weatherType:
            day.weather[0].description[0].toUpperCase() +
            day.weather[0].description.slice(1),
          maxTemp: day.temp.max,
          minTemp: day.temp.min,
        })
      })
      setDailyWeather(days)
    }
  }, [props.daily])

  const renderItem = (item) => <DisplayDay data={item.item} />

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Amplied Forecast</Text>
      </View>
      <FlatList
        data={dailyWeather}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#F9F9F9',
  },
  titleContainer: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 15,
    color: '#5AA9E6',
    fontWeight: 'bold',
  },
})

export default DisplayWeeklyWeather
