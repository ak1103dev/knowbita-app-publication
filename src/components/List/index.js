import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import { color, header } from '../../configs';
import moment from 'moment';

class List extends Component {
  state = {
    message: 'Press to go Video'
  }

  render() {
    const { info } = this.props;
    return (
      <TouchableHighlight
        onPress={this.props.goTo}
        underlayColor='transparent'
        style={styles.container}>
        <View style={styles.container}>
          <Image source={{uri: info.image}} style={styles.coverImage} />
          {
            this.props.isCourse &&
            <View style={styles.overImage}>
              <Text style={styles.numVideos}>{info.num_videos}</Text>
              <Text style={styles.numVideos}>VDOs</Text>
            </View>
          }
          <View style={styles.content}>
            <Text style={[header.h3, {marginRight: 140}]} adjustsFontSizeToFit={true} numberOfLines={2}>
              {info.name}
            </Text>
            {
              !this.props.isInstructor &&
              <Text style={styles.instructorName}>
                {info.instructor.name}
              </Text>
            }
            {
              this.props.isCourse
              ? <Text>{info.num_videos} videos</Text>
              : <Text>{moment(info.created_at).fromNow()} | {info.num_views} views</Text>
            }
            <View style={styles.tags}>
            {
              this.props.isTag &&
              info.tags.map((item, i) => <Text key={i} style={styles.tag}>{item}</Text>)
            }
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

List.propTypes = {
  goTo: PropTypes.func,
  info: PropTypes.object,
  isCourse: PropTypes.bool,
  isInstructor: PropTypes.bool,
  isTag: PropTypes.bool
};

const ratio = 8;
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.whiteBackground,
    flexDirection: 'row',
    margin: 5
  },
  coverImage: {
    width: 16 * ratio,
    height: 9 * ratio,
    marginRight: 10
  },
  overImage: {
    width: 16 * ratio / 5 * 2,
    height: 9 * ratio,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginLeft: -60,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numVideos: {
    color: '#FFF'
  },
  instructorName: {
    color: color.green
  },
  tags: {
    flexDirection: 'row'
  },
  tag: {
    backgroundColor: color.orange,
    color: '#FFF',
    padding: 3,
    marginRight: 3
  }
});

export default List;
