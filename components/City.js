import { TouchableHighlight, StyleSheet, Text, View } from 'react-native'

const City = (props) => {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={() =>
        props.onPress({ latitude: props.data.lat, longitude: props.data.lon })
      }
      activeOpacity={1}
      underlayColor='rgba(249, 249, 249, 1)'
    >
      <View style={styles.view}>
        <Text style={styles.text}>{props.data.name}, </Text>
        <Text style={styles.text}>{props.data.country}</Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  view: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
  },
})

export default City
