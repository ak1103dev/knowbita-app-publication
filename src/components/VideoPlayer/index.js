import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Slider
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { color } from '../../configs';

import secToTimeFormat from '../../utils/secToTimeFormat';

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.onProgressChanged = this.onProgressChanged.bind(this);
    this.addSeek = this.addSeek.bind(this);
    this.subSeek = this.subSeek.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
  }

  showControllerTimeOut = {}
  state = {
    rate: 1,
    volume: 1,
    muted: false,
    paused: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    showController: true
  }

  onLoad = (data) => {
    this.setState({duration: data.duration});
    this.showControllerTimeOut = setTimeout(() => this.setState({ showController: false }), 3000);
  }
  onProgress = (data) => {
    this.setState({currentTime: data.currentTime});
  }
  onPlayPause() {
    if (this.state.paused) {
      this.setState({ paused: false });
      this.showControllerTimeOut = setTimeout(() => this.setState({ showController: false }), 3000);
    } else {
      this.setState({ paused: true });
      clearTimeout(this.showControllerTimeOut);
    }
  }
  onProgressChanged(value) {
    this.setState({ currentTime: value });
    this.player.seek(value);
  }

  getCurrentTimeString() {
    if (this.state.duration / 60 >= 60) {
      return secToTimeFormat(3, this.state.currentTime);
    }
    return secToTimeFormat(2, this.state.currentTime);
  }
  getDurationTimeString() {
    if (this.state.duration / 60 >= 60) {
      return secToTimeFormat(3, this.state.duration);
    }
    return secToTimeFormat(2, this.state.duration);
  }
  showController() {
    this.setState({ showController: true });
    this.showControllerTimeOut = setTimeout(() => this.setState({ showController: false }), 3000);
  }
  pressExpandButton() {
    this.props.isFullscreen ? this.props.goOutFullScreen() : this.props.goToFullScreen();
  }
  addSeek() {
    this.setState({ currentTime: this.state.currentTime + 5 });
    this.player.seek(this.state.currentTime + 5);
  }
  subSeek() {
    this.setState({ currentTime: this.state.currentTime - 5 });
    this.player.seek(this.state.currentTime - 5);
  }

  renderController() {
    if (!this.state.showController) {
      return (
        <TouchableOpacity
          style={styles.controller}
          onPress={() => this.showController()}>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.controls}>
        <View style={styles.header}>
          <Text style={styles.name}>{this.props.name}</Text>
        </View>
        <View style={styles.playingControl}>
          <TouchableOpacity style={styles.playerButton} onPress={() => this.subSeek()}>
            <Icon name="angle-double-left" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playerButton} onPress={() => this.onPlayPause()}>
          {
            this.state.paused
            ? <Icon name="play" size={30} color="white" />
            : <Icon name="pause" size={30} color="white" />
          }
          </TouchableOpacity>
          <TouchableOpacity style={styles.playerButton} onPress={() => this.addSeek()}>
            <Icon name="angle-double-right" size={28} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.trackingControls}>
          <Text style={styles.currentTime}>{this.getCurrentTimeString()}</Text>
          <Slider
            style={styles.progress}
            minimumValue={0}
            maximumValue={this.state.duration}
            minimumTrackTintColor={'white'}
            maximumTrackTintColor={color.green}
            thumbTintColor={color.green}
            value={this.state.currentTime}
            onValueChange={this.onProgressChanged}
          />
          <Text style={styles.durationTime}>{this.getDurationTimeString()}</Text>
          <TouchableOpacity style={styles.expandButton}
            onPress={() => this.pressExpandButton()}>
            {
              this.props.isFullscreen
              ? <Icon name="compress" size={20} color="white" />
              : <Icon name="expand" size={20} color="white" />
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    // const uri = 'broadchurch';
    // const uri = 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4';
    // const uri = 'http://158.108.34.99:8080/html/148531588024f95.mp4';

    // const uri = 'https://knowbita.cpe.ku.ac.th/files/videos/14804786685c7db.mp4';
    // const uri = 'http://knowbita.cpe.ku.ac.th/files/videos/1480041272cd685.mp4';
    const { isFullscreen, uri } = this.props;
    return (
      <View style={isFullscreen ? styles.containerFull : styles.container}>
        <Video ref={(ref) => (this.player = ref)}
          source={{uri}}
          style={styles.fullScreen}
          rate={this.state.rate}
          paused={this.state.paused}
          volume={this.state.volume}
          muted={this.state.muted}
          resizeMode='contain'
          onLoad={this.onLoad}
          onProgress={this.onProgress}
          onEnd={this.props.gotoNext}
          repeat={false} />
        {this.renderController()}
      </View>
    );
  }
}

VideoPlayer.propTypes = {
  uri: PropTypes.string,
  name: PropTypes.string,
  gotoNext: PropTypes.func,
  goToFullScreen: PropTypes.func,
  goOutFullScreen: PropTypes.func,
  isFullscreen: PropTypes.bool
};
