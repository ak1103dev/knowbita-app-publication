import React, { Component, PropTypes } from 'react';
import {
  Picker,
  Text,
  Image,
  View,
  TouchableHighlight,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { TimePickerAndroid } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { tags, cameraRooms, color } from '../../configs';
import styles from './Instructor.styles';

import secToTimeFormat from '../../utils/secToTimeFormat';
import moment from 'moment';
import times from 'lodash/times';
import constant from 'lodash/constant';
import { connect } from 'react-redux';
import { video } from '../../redux/modules';

class InstructorHome extends Component {
  state = {
    room: cameraRooms[0],
    isStart: false,
    isSetStopTime: false,
    isAutoSendForm: false,
    isSavedForm: false,
    duration: 0.1,
    currentTime: 0,
    startTime: moment(),
    stopTime: undefined,
    currentStopTime: undefined,
    selectedTags: times(6, constant(false)),
    hourStop: '00',
    minStop: '00',
    timeStop: undefined
  }
  setDuration = {}
  setStopDuration = {}

  componentDidMount() {
  }

  onSave = () => {
    const { title, description, selectedTags, tags } = this.state;
    const valid = !!title && !!description && !!tags &&
      selectedTags.reduce((prev, curr) => (prev + curr), false) <= 4;
    // console.log(this.getDataForm());
    this.setState({ isSavedForm: valid, isInvalid: !valid });
  }
  onEdit = () => {
    this.setState({ isSavedForm: false });
  }
  getDataForm = (videoTitle) => {
    const { title, description, selectedTags, tags } = this.state;
    const cats = [
      '660505',
      '660507',
      '660511',
      '660510',
      '660509',
      '660512'
    ];
    const categories = [];
    selectedTags.map((tag, i) => {
      if (tag) categories.push(cats[i]);
    });
    return {
      title, description, tags, categories, videoTitle
    };
  }
  setTimeStop = (timeStop) => {
    this.setState({ timeStop });
  }
  setStopTime = (type) => {
    let stopTime;
    if (type === 'relative') {
      const { hourStop, minStop } = this.state;
      if (hourStop === '00' || minStop === '00') {
        return Alert.alert('Invalid time', 'You should select time');
      } else if (minStop > 59) {
        return Alert.alert('Invalid time', 'Minutes is more than');
      }
      const secs = parseInt(hourStop) * 3600 + parseInt(minStop) * 60;
      stopTime = moment().add(secs, 'seconds');
    } else if (type === 'absolute') {
      const { timeStop } = this.state;
      if (!timeStop) return Alert.alert('Invalid time', 'You should select time');
      stopTime = moment().set(timeStop);
    }
    this.setState({ stopTime });
    this.setStopDuration = setInterval(() => {
      const currentStopTime = moment(this.state.stopTime).diff(moment(), 'seconds');
      this.setState({ currentStopTime });
      if (this.state.stopTime && currentStopTime === 0 &&
        this.state.isSetStopTime && !this.props.recording) {
        this.recordToggle();
      }
    }, 1000);
  }
  setRelativeTime = () => {
    const { startTime } = this.state;
    const currentTime = -moment(startTime).diff(moment(), 'seconds');
    this.setState({ currentTime });
  }
  recordToggle = () => {
    const { isStart, room } = this.state;
    const { cameraId, roomNumber } = room;
    if (isStart) {
      this.props.recordVideo({ cameraId, cmd: 'stop', roomNumber })
      .then((response) => {
        this.setState({
          isStart: false,
          stopTime: undefined,
          currentStopTime: undefined
        });
        clearInterval(this.setDuration);
        clearInterval(this.setStopDuration);
        const videoTitle = response.value.title;
        this.props.uploadVideo()
        .then(() => {
          if (this.state.isSavedForm && this.state.isAutoSendForm) {
            setTimeout(() =>
              this.props.updateVideo(this.getDataForm(videoTitle))
            , 20000);
          }
        });
      });
    } else {
      this.props.recordVideo({ cameraId, cmd: 'start', roomNumber })
      .then(() => {
        this.setState({ isStart: true, startTime: moment() });
        this.setDuration = setInterval(this.setRelativeTime, 1000);
      })
      .catch(() => Alert.alert('Start recording is error!', this.props.errorMessage));
    }
  }
  toggleStopTime = () => {
    const { isSetStopTime } = this.state;
    if (isSetStopTime) {
      this.setState({ isSetStopTime: false });
    } else {
      this.setState({ isSetStopTime: true });
    }
  }
  toggleAutoSendForm = () => {
    const { isAutoSendForm } = this.state;
    if (isAutoSendForm) {
      this.setState({ isAutoSendForm: false });
    } else {
      this.setState({ isAutoSendForm: true });
    }
  }
  onSelectTags = (index) => {
    let { selectedTags } = this.state;
    selectedTags[index] = !selectedTags[index];
    this.setState({ selectedTags });
  }

  renderCheckbox({ onChange, checked, text }) {
    return (
      <TouchableHighlight
        onPress={onChange}
        underlayColor='transparent'>
        <View style={styles.checkbox}>
          {
            checked
            ? <Icon name="check-square-o" size={20} color={color.orange} />
            : <Icon name="square-o" size={20} color={color.orange} />
          }
          <Text style={checked && {color: color.orange}}>{`  ${text}`}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const {
      isStart, isSetStopTime, isAutoSendForm,
      currentTime, selectedTags, isSavedForm,
      stopTime, currentStopTime
    } = this.state;
    const textInputProps = {
      keyboardType: 'numeric',
      placeholder: '00',
      maxLength: 2,
      style: { textAlign: 'center' }
    };
    return (
      <View style={styles.container}>
        <Picker enabled={!isStart}
          style={styles.room} selectedValue={this.state.room}
          onValueChange={(room) => this.setState({ room })}>
          {
            cameraRooms.map((info, i) =>
              <Picker.Item key={i}
                label={`Lecture Room ${info.roomNumber}, Building ${info.buildingNumber}`}
                value={info} />
            )
          }
        </Picker>
        <View>
          <View>
            <Image source={{uri: this.state.room.image}} style={styles.coverImage} />
          </View>
          <TouchableHighlight
            onPress={this.props.recording ? () => {} : this.recordToggle}
            style={isStart ? styles.stopRecordBtn : styles.startRecordBtn}
            underlayColor='transparent'>
            <View>
              {
                this.props.recording &&
                <ActivityIndicator size={20} color={'white'} />
              }
              {
                isStart
                ? <Icon name="stop" size={28} color="white" />
                : <Icon name="video-camera" size={28} color="white" />
              }
            </View>
          </TouchableHighlight>
        </View>
        <Text style={isStart ? styles.timeActive : styles.time }>
          {secToTimeFormat(3, currentTime)}
        </Text>
        {
          isSetStopTime &&
          <View style={styles.stopTimeDisplay}>
            <Text>Stop recording</Text>
            <Text style={{ color: currentStopTime ? 'black' : null }}>
              in {currentStopTime ? secToTimeFormat(3, currentStopTime) : 'no select'}
            </Text>
            <Text style={{ color: stopTime ? 'black' : null }}>
              at {stopTime ? moment(stopTime).format('HH:mm') : 'no select'}
            </Text>
          </View>
        }
        {
          this.renderCheckbox({
            onChange: this.toggleStopTime,
            checked: isSetStopTime,
            text: 'Set stop time'
          })
        }
        {
          isSetStopTime &&
          <View style={styles.stopRecording}>
            <View style={styles.timepicker}>
              <Text>Stop recording in</Text>
              <TextInput {...textInputProps}
                onChangeText={(hourStop) => this.setState({ hourStop })}
              />
              <Text>hour(s)</Text>
              <TextInput {...textInputProps}
                onChangeText={(minStop) => this.setState({ minStop })}
              />
              <Text>minute(s)</Text>
              <TouchableHighlight style={styles.okButton}
                onPress={() => this.setStopTime('relative')}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.timepicker}>
              <Text>or Stop recording at{' '}</Text>
              <TimePickerAndroid setTimeStop={this.setTimeStop} />
              <TouchableHighlight style={styles.okButton}
                onPress={() => this.setStopTime('absolute')}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableHighlight>
            </View>
          </View>
        }
        {
          this.renderCheckbox({
            onChange: this.toggleAutoSendForm,
            checked: isAutoSendForm,
            text: 'Auto send form'
          })
        }
        {
          isAutoSendForm &&
          <View style={styles.autoSendForm}>
            <View style={styles.formControl}>
              <Text>Title</Text>
              <TextInput
                value={this.state.title}
                editable={!isSavedForm} onChangeText={(title) => this.setState({ title })} />
            </View>
            <View style={styles.formControl}>
              <Text>Description</Text>
              <TextInput
                value={this.state.description}
                editable={!isSavedForm}
                multiline numberOfLines={3}
                onChangeText={(description) => this.setState({ description })} />
            </View>
            <View style={styles.formControl}>
              <Text>Video Category (No more than 4 categories)</Text>
              <View style={styles.tags}>
                {
                  tags.map((tag, i) =>
                    <Text key={i}
                      style={selectedTags[i] ? styles.tagActive : styles.tag}
                      onPress={isSavedForm ? () => {} : () => this.onSelectTags(i)}>
                      {tag}
                    </Text>
                  )
                }
              </View>
            </View>
            <View style={styles.formControl}>
              <Text>Tags</Text>
              <TextInput
                value={this.state.tags}
                placeholder="Tags are separated by commas ie. ox, cat"
                placeholderTextColor={color.grayText}
                editable={!isSavedForm} onChangeText={(tags) => this.setState({ tags })} />
            </View>
            {
              this.state.isInvalid &&
              <Text style={styles.errorMessage}>Data is not fulfilled</Text>
            }
            <View style={styles.buttonGroup}>
              <TouchableHighlight
                style={isSavedForm ? styles.disabledButton : styles.saveButton}
                onPress={isSavedForm ? null : this.onSave}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={isSavedForm ? styles.editButton : styles.disabledButton}
                onPress={isSavedForm ? this.onEdit : null }
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableHighlight>
            </View>
          </View>
        }
        <KeyboardSpacer />
      </View>
    );
  }
}

InstructorHome.propTypes = {
  recordVideo: PropTypes.func,
  uploadVideo: PropTypes.func,
  updateVideo: PropTypes.func,
  recording: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default connect(
  (state) => ({
    recording: state.video.recording,
    error: state.video.error,
    errorMessage: state.video.errorMessage
  }),
  (dispatch) => ({
    recordVideo: (data) => dispatch(video.actions.recordVideo(data)),
    uploadVideo: () => dispatch(video.actions.uploadVideo()),
    updateVideo: (data) => dispatch(video.actions.updateVideo(data))
  })
)(InstructorHome);
