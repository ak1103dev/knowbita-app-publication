import {
  StyleSheet,
  Dimensions
} from 'react-native';
import { color } from '../../configs';

const { width } = Dimensions.get('window');
const margin = 40;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginBottom: 60
  },
  room: {
    marginLeft: 20,
    marginRight: 20
  },
  coverImage: {
    marginLeft: margin,
    marginRight: margin,
    width: width - 2 * margin,
    height: 200
  },
  startRecordBtn: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.green,
    width: 70,
    height: 70
  },
  stopRecordBtn: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: 70,
    height: 70
  },
  time: {
    alignSelf: 'center',
    fontSize: 40,
    color: color.grayText
  },
  timeActive: {
    alignSelf: 'center',
    fontSize: 40,
    color: 'black'
  },
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  stopRecording: {
    marginLeft: 30,
    marginTop: 10
  },
  stopTimeDisplay: {
    alignSelf: 'center'
  },
  timepicker: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  autoSendForm: {
    marginRight: 20,
    marginLeft: 20,
    borderColor: color.grayBorder,
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    marginBottom: 20
  },
  formControl: {
    marginBottom: 10
  },
  tags: {
    flexDirection: 'row'
  },
  tag: {
    backgroundColor: color.grayLight,
    padding: 5,
    marginRight: 5,
    marginTop: 10
  },
  tagActive: {
    backgroundColor: color.green,
    color: 'white',
    padding: 5,
    marginRight: 5,
    marginTop: 10
  },
  saveButton: {
    flex: 1,
    backgroundColor: color.green,
    alignItems: 'center',
    borderRadius: 3,
    marginRight: 5
  },
  editButton: {
    flex: 1,
    backgroundColor: color.orange,
    alignItems: 'center',
    borderRadius: 3,
    marginLeft: 5
  },
  disabledButton: {
    flex: 1,
    backgroundColor: color.grayText,
    alignItems: 'center',
    borderRadius: 3,
    marginRight: 5
  },
  okButton: {
    backgroundColor: color.green,
    marginLeft: 5,
    borderRadius: 3
  },
  buttonText: {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  buttonGroup: {
    flexDirection: 'row'
  },
  errorMessage: {
    color: color.danger,
    textAlign: 'center',
    paddingBottom: 10
  }
});

export default styles;
