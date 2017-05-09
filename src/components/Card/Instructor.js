import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import { color, header } from '../../configs';

class InstructorCard extends Component {
  state = {
    message: 'Press to go Video'
  }

  render() {
    const { info } = this.props;
    return (
      <TouchableHighlight
        onPress={() => this.props.goTo(info._id, info.name)}
        underlayColor='transparent'>
        <View style={styles.container}>
          <Image source={{uri: info.image}} style={styles.coverImage} />
          <View>
            <Text style={[header.h2, styles.name]} adjustsFontSizeToFit={true} numberOfLines={1}>
              {info.name}
            </Text>
            <Text style={header.h3}>{info.email}</Text>
            <Text>{info.department}</Text>
            <Text>{info.faculty}</Text>
            <View style={styles.tags}>
              <Text>{info.num_videos} Videos | {info.num_courses} Courses</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

InstructorCard.propTypes = {
  goTo: PropTypes.func,
  info: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.whiteBackground,
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.grayBorder
  },
  coverImage: {
    width: 120,
    height: 120,
    marginRight: 10
  },
  name: {
    marginRight: 130,
    color: color.green,
    fontWeight: 'bold'
  },
  tags: {
    paddingTop: 5
  }
});

export default InstructorCard;
