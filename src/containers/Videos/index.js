import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Card } from '../../components';
import { color } from '../../configs';

import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { routing, video } from '../../redux/modules';

class Videos extends Component {
  state = {
    page: 1,
    scrollHeight: 0
  }

  componentDidMount() {
    this.props.loadVideos(0);
  }

  goToVideo = (id) => {
    this.props.changeRoute({ id: 'video', title: this.props.title, index: this.props.index });
    this.props.navigator.push({ id: 'video', title: '', params: { id } });
  }
  onScroll = (event) => {
    const yPosition = event.nativeEvent.contentOffset.y;
    const contentHeight = 2500;
    const { scrollHeight } = this.state;
    if (yPosition + contentHeight > scrollHeight && !this.props.loading) {
      this.props.loadVideos(this.state.page);
      this.setState({ page: this.state.page + 1 });
    }
  }
  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ scrollHeight: contentHeight });
  }

  render() {
    const { videos } = this.props;
    if (isEmpty(videos)) {
      return (
        <ActivityIndicator size={50} color={color.green} />
      );
    }
    return (
      <ScrollView style={styles.container}
        onScroll={this.onScroll}
        onContentSizeChange={this.onContentSizeChange}>
        {
          (videos || []).map((item, i) => {
            return <Card key={i} goTo={this.goToVideo} info={item} />;
          })
        }
      </ScrollView>
    );
  }
}

Videos.propTypes = {
  navigator: PropTypes.object,
  changeRoute: PropTypes.func,
  title: PropTypes.string,
  index: PropTypes.number,
  loadVideos: PropTypes.func,
  videos: PropTypes.array,
  loading: PropTypes.bool
};

export default connect(
  (state) => ({
    title: state.routing.title,
    index: state.routing.index,
    videos: state.video.videos,
    loading: state.video.loading
  }),
  (dispatch) => ({
    changeRoute: (route) => dispatch(routing.actions.changeRoute(route)),
    loadVideos: (page) => dispatch(video.actions.loadVideos(page))
  })
)(Videos);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginBottom: 60
  }
});
