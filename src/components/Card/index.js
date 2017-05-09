import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions
} from 'react-native';
import { color, header } from '../../configs';
import moment from 'moment';

class Card extends Component {
  state = {
    message: 'Press to go Video'
  }

  render() {
    const { info } = this.props;
    // const image = 'https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg';
    return (
      <TouchableHighlight
        onPress={() => this.props.goTo(info._id)}
        underlayColor='transparent'
        style={styles.container}>
        <View>
          <Image source={{uri: info.image}} style={styles.coverImage} />
          <View style={this.props.isCourse ? styles.overImageCourse : styles.overImage}>
            {
              this.props.isCourse
              ? <View style={styles.numVideos}>
                  <Text style={[header.h2, { color: '#FFF' }]}>{info.num_videos}</Text>
                  <Text style={[header.h2, { color: '#FFF' }]}>VDOs</Text>
                </View>
              : <Text style={styles.time}>
                {info.time_duration}
              </Text>
            }
            <View style={styles.tagRow}>
            {
              info.tags.map((item, i) => {
                return <Text key={i} style={styles.tag}>{item}</Text>;
              })
            }
            {
              info.tags.length === 0 &&
              <Text style={[styles.tag, {backgroundColor: 'transparent'}]}>.</Text>
            }
            </View>
          </View>

          <View style={styles.content}>
            <Image source={{uri: info.instructor.image}} style={styles.instructorImage} />
            <View>
              <Text style={[header.h3, styles.name]}>
                {info.name}
              </Text>
              <Text style={styles.instructorName}>
                {info.instructor.name}
              </Text>
              {
                this.props.isCourse
                ? <Text>{info.num_videos} videos</Text>
                : <Text>{info.num_views} views | {moment(info.created_at).fromNow()}</Text>
              }
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

Card.propTypes = {
  goTo: PropTypes.func,
  info: PropTypes.object,
  isCourse: PropTypes.bool
};

const { width } = Dimensions.get('window');
const margin = 20;
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.whiteBackground,
    padding: margin,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.grayBorder
  },
  coverImage: {
    width: width - 2 * margin,
    height: 200
  },
  overImage: {
    backgroundColor: 'rgba(32, 32, 32, 0.5)',
    marginTop: -55,
    alignItems: 'flex-end'
  },
  overImageCourse: {
    width: (width - 2 * margin) / 2,
    height: 200,
    backgroundColor: 'rgba(32, 32, 32, 0.5)',
    marginTop: -200,
    alignSelf: 'flex-end'
    // alignItems: 'flex-end'
  },
  numVideos: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  time: {
    color: '#FFF',
    backgroundColor: '#000',
    padding: 2,
    margin: 2
  },
  tag: {
    color: '#FFF',
    backgroundColor: color.orange,
    padding: 2,
    margin: 2
  },
  content: {
    flexDirection: 'row',
    marginTop: 5
  },
  name: {
    paddingRight: 20,
    marginRight: 20
  },
  instructorImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 5,
    marginRight: 5
  },
  instructorName: {
    color: color.green
  },
  tagRow: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  }
});

export default Card;
