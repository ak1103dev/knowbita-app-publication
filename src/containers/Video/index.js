import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { VideoPlayer, List } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { header, color } from '../../configs';
import styles from './styles';

import moment from 'moment';
import RNFetchBlob from 'react-native-fetch-blob';
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';
import { routing, video, course } from '../../redux/modules';

class Video extends Component {
  state = {
    isFullscreen: false,
    downloadedProgress: 0.00,
    videoIndex: 0,
    loading: true
  }
  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      console.log('land');
    } else {
      console.log('port');
    }
  }
  componentDidMount() {
    const { params } = this.props.route;
    if (params.isCourse) {
      this.props.loadCourse(params.id)
      .then(() => this.props.loadVideo(this.props.course[params.index]._id))
      .then(() => this.setState({ loading: false }));
    } else {
      Promise.all([
        this.props.loadVideo(params.id),
        this.props.loadVideoList(params.id)
      ])
      .then(() => this.setState({ loading: false }));
    }
    this.props.hideNavBar(true);
    Orientation.lockToPortrait();
    Orientation.addOrientationListener(this._orientationDidChange);
  }
  componentWillUnmount() {
    const routesList = this.props.navigator.getCurrentRoutes(0);
    if (routesList.length >= 1 && routesList[routesList.length - 1].id === 'search') {
      this.props.hideNavBar(true);
    } else {
      this.props.hideNavBar(false);
    }
    Orientation.lockToPortrait();
    // Orientation.getOrientation((err, orientation) => {
    //   if (err) console.log('Error', err);
    //   console.log('Current Device Orientation: ', orientation);
    // });
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  changeVideo = (id) => {
    if (this.props.route.params.isCourse) {
      this.props.loadVideo(id);
    } else {
      this.props.loadVideo(id);
      this.props.loadVideoList(id);
    }
  }
  goToInstructor = (id, name) => {
    this.props.navigator.replace({
      id: 'instrutor',
      title: name,
      params: { id }
    });
  }
  goToFullScreen = () => {
    Orientation.lockToLandscape();
    this.setState({ isFullscreen: true });
  }
  goOutFullScreen = () => {
    Orientation.lockToPortrait();
    this.setState({ isFullscreen: false });
  }
  gotoNext = () => {
    const { videoList, route } = this.props;
    if (route.params.isCourse) {
      const newIndex = route.params.index + 1;
      this.props.navigator.replace({
        id: 'video',
        title: '',
        params: { id: route.params.id, isCourse: true, index: newIndex }
      });
    } else {
      this.props.navigator.replace({ id: 'video', title: '', params: { id: videoList[0]._id } });
    }
  }
  download = () => {
    console.log('download');
    const dirs = RNFetchBlob.fs.dirs;
    const url = this.props.video.uri;
    const videoName = url.split('/').slice(-1)[0];
    RNFetchBlob
    .config({
      path: `${dirs.MovieDir}/knowbita/${videoName}`
    })
    .fetch('GET', this.props.video.uri)
    .progress((received, total) => {
      const progress = received / total;
      this.setState({ downloadedProgress: (progress * 100).toFixed(0) });
    })
    .then((res) => {
      console.log('The file saved to ', res.path());
      this.setState({ downloadedProgress: 100 });
    });
  }

  render() {
    const { video, course, videoList } = this.props;
    if (this.state.loading) {
      return <ActivityIndicator style={styles.loader} size={50} color={color.green} />;
    }
    return (
      <View style={styles.container}>
        <StatusBar hidden={this.state.isFullscreen} />
        <VideoPlayer
          uri={video.uri}
          name={video.name}
          gotoNext={this.gotoNext}
          isFullscreen={this.state.isFullscreen}
          goOutFullScreen={this.goOutFullScreen}
          goToFullScreen={this.goToFullScreen} />
        {
          !this.state.isFullscreen &&
          <ScrollView style={styles.content}>
            <View style={styles.info}>
              <View>
                <Text style={header.h1}>{video.name}</Text>
                <Text>{video.description}</Text>
                <Text>{video.num_views} views</Text>
                <Text>Published on {moment(video.created_at).fromNow()}</Text>
                <View style={styles.lastRow}>
                  <View style={styles.tags}>
                    {
                      video.tags.map((item, i) => {
                        return <Text key={i} style={styles.tag}>{item}</Text>;
                      })
                    }
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.downloadedProgress}>{this.state.downloadedProgress} %</Text>
                    <TouchableOpacity onPress={this.download}>
                      <Icon name="download" size={30} color={color.darkGray} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.instructor}
                onPress={() => this.goToInstructor(video.instructor._id, video.instructor.name)}>
                <Image source={{uri: video.instructor.image}} style={styles.instructorImage} />
                <Text style={[styles.instructorName, header.h3]}>{video.instructor.name}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.videoList}>
              {
                (this.props.route.params.isCourse ? course : videoList).map((item, i) =>
                  <List key={i} info={item} goTo={() => this.changeVideo(item._id)} />)
              }
            </View>
          </ScrollView>
        }
      </View>
    );
  }
}

Video.propTypes = {
  title: PropTypes.string,
  navigator: PropTypes.object,
  route: PropTypes.object,
  routing: PropTypes.object,
  hideNavBar: PropTypes.func,
  loadVideo: PropTypes.func,
  video: PropTypes.object,
  loadCourse: PropTypes.func,
  course: PropTypes.array,
  loadVideoList: PropTypes.func,
  videoList: PropTypes.array
};

export default connect(
  (state) => ({
    routing: state.routing,
    video: state.video.video,
    videoList: state.video.videoList,
    course: state.course.course
  }),
  (dispatch) => ({
    hideNavBar: (hideNav) => dispatch(routing.actions.hideNavBar(hideNav)),
    loadVideo: (id) => dispatch(video.actions.loadVideo(id)),
    loadVideoList: (id) => dispatch(video.actions.loadVideoList(id)),
    loadCourse: (id) => dispatch(course.actions.loadCourse(id))
  })
)(Video);
