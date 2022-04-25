import { View, StyleSheet, useWindowDimensions, Text } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { useState, useEffect } from 'react'

const DisplayHourlyWeather = (props) => {
  const { width } = useWindowDimensions()
  const [data, setData] = useState({
    labels: ['empty', 'empty'],
    datasets: [
      {
        data: [0, 0],
        color: (opacity = 1) => `rgba(229, 98, 94, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  })
  const chartConfig = {
    backgroundGradientFrom: '#F9F9F9',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#F9F9F9',
    backgroundGradientToOpacity: 0.3,
    color: (opacity = 1) => `rgba(229, 98, 94, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  }
  useEffect(() => {
    if (props.hourly) {
      const nextHours = props.hourly.slice(0, 24)
      const hours = []
      const temps = []
      nextHours.forEach((item, index) => {
        if (index % 4 == 0) {
          const date = new Date(item.dt * 1000)
          hours.push(date.getHours() + ':' + date.getMinutes() + '0')
          temps.push(item.temp)
        }
      })
      setData((prevData) => ({
        ...prevData,
        labels: hours,
        datasets: [
          {
            ...prevData.datasets[0],
            data: temps,
          },
        ],
      }))
    }
  }, [props.hourly])
  if (props.hourly) {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Temperature for the next hours</Text>
        </View>
        <LineChart
          data={data}
          width={width}
          height={180}
          chartConfig={chartConfig}
          withHorizontalLines={false}
          withVerticalLines={true}
          segments={3}
          formatYLabel={(label) => parseInt(label)}
        />
      </View>
    )
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    backgroundColor: '#F9F9F9',
  },
  titleContainer: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 15,
    color: '#5AA9E6',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
})

export default DisplayHourlyWeather
