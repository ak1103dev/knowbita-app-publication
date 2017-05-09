import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';
import { Card } from '../../components';

import { header, color } from '../../configs';
import { connect } from 'react-redux';
import { routing, video } from '../../redux/modules';

class StudentHome extends Component {
  componentDidMount() {
    this.props.loadVideoHistory();
  }

  goToVideo = (id) => {
    this.props.changeRoute({ id: 'video', title: this.props.title, index: this.props.index });
    this.props.navigator.push({ id: 'video', title: '', params: { id } });
  }

  render() {
    const { videoHistory } = this.props;
    if (this.props.loading) {
      return (
        <View>
          <Text style={[header.h1, styles.watchLater]}>Seen Videos</Text>
          <ActivityIndicator size={50} color={color.green} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={[header.h1, styles.watchLater]}>Seen Videos</Text>
        {
          (videoHistory || []).map((item, i) => {
            return <Card key={i} goTo={this.goToVideo} info={item} />;
          })
        }
      </View>
    );
  }
}

StudentHome.propTypes = {
  navigator: PropTypes.object,
  changeRoute: PropTypes.func,
  title: PropTypes.string,
  index: PropTypes.number,
  loading: PropTypes.bool,
  loadVideoHistory: PropTypes.func,
  videoHistory: PropTypes.array
};

export default connect(
  (state) => ({
    title: state.routing.title,
    index: state.routing.index,
    videoHistory: state.video.videoHistory,
    loading: state.video.loading
  }),
  (dispatch) => ({
    changeRoute: (route) => dispatch(routing.actions.changeRoute(route)),
    loadVideoHistory: () => dispatch(video.actions.loadVideoHistory())
  })
)(StudentHome);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginBottom: 60
  },
  watchLater: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    color: '#FFF',
    backgroundColor: color.green
  }
});
