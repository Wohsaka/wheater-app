import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
} from 'react-native'
import Button from './Button'
import City from './City'

const SearchModal = (props) => {
  const renderItem = (item) => (
    <City data={item.item} onPress={props.onSelectCity} />
  )

  return (
    <Modal visible={props.visible} animationType={'slide'} transparent={true}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='London, UK'
              style={styles.input}
              value={props.inputValue}
              onChangeText={(value) => props.onChangeText(value)}
            />
            <Button
              tittle='Search'
              onPress={props.onSearch}
              style={styles.searchButton}
            />
          </View>
          <View style={styles.resultContainer}>
            {props.searchResult == 0 ? (
              <View style={styles.textContainer}>
                <Text style={styles.text}>No match found!</Text>
              </View>
            ) : (
              <FlatList
                data={props.searchResult}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  card: {
    width: 300,
    backgroundColor: 'rgba(249, 249, 249, 1)',
    flex: 0.5,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 3,
    padding: 20,
  },
  searchButton: {
    backgroundColor: '#5AA9E6',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'stretch',
  },
  input: {
    borderRadius: 5,
    borderColor: 'rgba(90, 169, 230, 0.4)',
    borderWidth: 2,
    flex: 0.8,
    paddingLeft: 10,
    color: 'black',
  },
  resultContainer: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'rgba(230, 230, 230, 0.4)',
    justifyContent: 'center',
    alignSelf: 'stretch',
    padding: 15,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    color: 'rgba(200, 200, 200, 1)',
    fontSize: 25,
    fontWeight: 'bold',
  },
})

export default SearchModal
