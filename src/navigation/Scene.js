import React, { Component, PropTypes } from 'react';
import {
  BackAndroid
} from 'react-native';
import {
  Landing,
  App,
  Search,
  Profile,
  Video,
  Instructor,
  Help
} from '../containers';

import { connect } from 'react-redux';
import { routing } from '../redux/modules';

class Scene extends Component {
  componentDidMount() {
    const { route, navigator, changeRoute, routing } = this.props;
    // navigator.replace(this.props.routing);
    BackAndroid.addEventListener('hardwareBackPress', function() {
      if (route.id === 'video') {
        changeRoute({ id: 'app', title: routing.title, index: 0 });
      }
      if (route.id !== 'app' && route.id !== 'landing') {
        // navigator.popToTop();
        navigator.pop();
        return true;
      }
      BackAndroid.exitApp();
      return false;
    });
  }

  render() {
    const { route, navigator } = this.props;
    switch (route.id) {
      case 'landing':
        return <Landing navigator={navigator}/>;
      case 'app':
        return <App navigator={navigator}/>;
      case 'search':
        return <Search navigator={navigator}/>;
      case 'profile':
        return <Profile navigator={navigator}/>;
      case 'video':
        return <Video navigator={navigator} route={route}/>;
      case 'instrutor':
        return <Instructor navigator={navigator} route={route}/>;
      case 'help':
        return <Help navigator={navigator} route={route}/>;
      default:
        return null;
    }
  }
}

Scene.propTypes = {
  route: PropTypes.object,
  navigator: PropTypes.object,
  routing: PropTypes.object,
  changeRoute: PropTypes.func
};

export default connect(
  (state) => ({
    routing: state.routing
  }),
  (dispatch) => ({
    changeRoute: (route) => dispatch(routing.actions.changeRoute(route))
  })
)(Scene);
