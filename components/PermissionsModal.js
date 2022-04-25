import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import Button from './Button'

const PermissionsModal = (props) => {
  return (
    <Modal animationType='slide' transparent={true} visible={props.visible}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={props.triggerModal}
          >
            <Entypo name='cross' size={25} color='black' />
          </TouchableOpacity>
          <Text>
            This APP uses your location only to get the weather forecast for
            your city, You can give the APP permissions or search your city with
            the buttons below.
          </Text>
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.permissionsButton}
              onPress={props.requestPermissions}
              tittle={'    Allow    '}
            />
            <Button
              style={styles.searchButton}
              onPress={props.triggerSearch}
              tittle={'Search City'}
            />
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
  modalContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    backgroundColor: 'rgba(249, 249, 249, 1)',
    width: 300,
    padding: 20,
    borderRadius: 3,
  },
  permissionsButton: {
    backgroundColor: '#5AA9E6',
  },
  searchButton: {
    backgroundColor: '#E5625E',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 2,
  },
})

export default PermissionsModal
