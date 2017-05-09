import React, { Component, PropTypes } from 'react';
import {
  TimePickerAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class TimePickerAndroidExample extends Component {
  state = {
    isoFormatText: 'Select stop time'
  };

  showPicker = async (stateKey, options) => {
    try {
      const {action, minute, hour} = await TimePickerAndroid.open(options);
      var newState = {};
      if (action === TimePickerAndroid.timeSetAction) {
        newState[stateKey + 'Text'] = _formatTime(hour, minute);
        newState[stateKey + 'Hour'] = hour;
        newState[stateKey + 'Minute'] = minute;
      }
      this.props.setTimeStop({ hour, minute });
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  render() {
    return (
      <View>
        <View>
          <TouchableOpacity
            onPress={this.showPicker.bind(this, 'isoFormat', {
              hour: this.state.isoFormatHour,
              minute: this.state.isoFormatMinute,
              is24Hour: true
            })}>
            <Text style={styles.text}>{this.state.isoFormatText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

TimePickerAndroidExample.propTypes = {
  setTimeStop: PropTypes.func
};

function _formatTime(hour, minute) {
  return hour + ':' + (minute < 10 ? '0' + minute : minute);
}

var styles = StyleSheet.create({
  text: {
    color: 'black'
  }
});
