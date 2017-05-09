import React, { Component, PropTypes } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import Instructor from './Instructor';
import Student from './Student';

import { connect } from 'react-redux';
import { session, video } from '../../redux/modules';

class Home extends Component {
  state = {
    isRefreshing: false
  }

  componentDidMount() {
    this.props.getMe();
  }
  _onRefresh = () => {
    this.setState({isRefreshing: true});
    this.props.getMe()
    .then(() => this.setState({isRefreshing: false}));
  }
  _onRefreshStudent = () => {
    this.setState({isRefreshing: true});
    Promise.all([
      this.props.getMe(),
      this.props.loadVideoHistory()
    ])
    .then(() => this.setState({isRefreshing: false}));
  }
  render() {
    const { user, title, navigator } = this.props;
    if (user.is_instructor) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#15d4e7"
              title="Loading..."
              titleColor="#15d4e7"
              colors={['#15b4e7', '#15b4e7', '#15b4e7']}
              progressBackgroundColor="#ffffff"
            />
        }>
          <Instructor />
        </ScrollView>
      );
    }
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#15d4e7"
            title="Loading..."
            titleColor="#15d4e7"
            colors={['#15b4e7', '#15b4e7', '#15b4e7']}
            progressBackgroundColor="#ffffff"
          />
      }>
        <Student title={title} navigator={navigator} />
      </ScrollView>
    );
  }
}

Home.propTypes = {
  navigator: PropTypes.object,
  title: PropTypes.string,
  getMe: PropTypes.func,
  user: PropTypes.object,
  loadVideoHistory: PropTypes.func
};

export default connect(
  (state) => ({
    user: state.session.user
  }),
  (dispatch) => ({
    getMe: () => dispatch(session.actions.getMe()),
    loadVideoHistory: () => dispatch(video.actions.loadVideoHistory())
  })
)(Home);
