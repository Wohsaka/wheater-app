import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const Button = (props) => {
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={props.onPress}
    >
      <Text style={[styles.text, props.textStyle]}>{props.tittle}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 3,
    backgroundColor: '#E5625E',
  },
  text: {
    color: '#F9F9F9',
  },
})

export default Button
