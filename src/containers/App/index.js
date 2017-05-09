import React, { Component, PropTypes } from 'react';
import {
  StyleSheet
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import {
  Home,
  Videos,
  Instructors,
  Courses
  // Page
} from '../index';
import { CustomTabBar } from '../../components';

import { connect } from 'react-redux';
import { routing } from '../../redux/modules';

const name = [
  'Home',
  'Videos',
  'Courses',
  'Instructors'
];

export class App extends Component {
  state = {
    message: 'Welcome to React Native!'
  }
  componentDidMount() {
    this.props.hideNavBar(false);
  }

  onChangeTab(i) {
    this.props.changeRoute({ id: 'app', title: name[i], index: i });
  }

  render() {
    return (
      <ScrollableTabView
        style={styles.container}
        renderTabBar={() => <CustomTabBar />}
        initialPage={this.props.route.index}
        onChangeTab={({ from, i }) => this.onChangeTab(i)}
      >
        <Home tabLabel='home' title={name[0]} navigator={this.props.navigator} />
        <Videos tabLabel='video-camera' title={name[1]} navigator={this.props.navigator} />
        <Courses tabLabel='book' title={name[2]} navigator={this.props.navigator} />
        <Instructors tabLabel='users' title={name[3]} navigator={this.props.navigator} />
      </ScrollableTabView>
    );
  }
}

App.propTypes = {
  changeRoute: PropTypes.func,
  hideNavBar: PropTypes.func,
  navigator: PropTypes.object,
  route: PropTypes.object
};

export default connect(
  (state) => ({
    route: state.routing
  }),
  (dispatch) => ({
    changeRoute: (route) => dispatch(routing.actions.changeRoute(route)),
    hideNavBar: (hideNav) => dispatch(routing.actions.hideNavBar(hideNav))
  })
)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    top: 60
  }
});
