import { View, Text, StyleSheet, Image } from 'react-native'

const DisplayDay = (props) => {
  const iconUrl = 'http://openweathermap.org/img/wn/'
  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <View style={styles.dayContainer}>
          <Text style={[styles.font]}>{props.data.day}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={{ uri: iconUrl + props.data.icon + '@2x.png' }}
          />
          <Text style={[styles.font]}>{props.data.weatherType}</Text>
        </View>
        <View style={styles.tempContainer}>
          <Text style={[styles.maxTemp, styles.font]}>
            {parseInt(props.data.maxTemp)}°C
          </Text>
          <Text style={[styles.minTemp, styles.font]}>
            {' '}
            - {parseInt(props.data.minTemp)}°C
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 30,
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderBottomColor: '#d7dadb',
    borderBottomWidth: 1,
  },
  iconContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dayContainer: {
    flex: 1,
  },
  maxTemp: {
    color: '#E5625E',
  },
  minTemp: {
    color: '#5AA9E6',
  },
  icon: {
    width: 40,
    height: 40,
  },
  font: {
    fontSize: 14,
  },
})

export default DisplayDay
