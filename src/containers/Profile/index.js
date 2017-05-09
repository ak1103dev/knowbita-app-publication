import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { color, header } from '../../configs';

import moment from 'moment';
import { connect } from 'react-redux';
import { session, routing } from '../../redux/modules';

export class Profile extends Component {
  componentDidMount() {
    this.props.getMe();
  }
  componentWillUnmount() {
    const routesList = this.props.navigator.getCurrentRoutes(0);
    if (routesList.length >= 1 && routesList[routesList.length - 1].id === 'landing') {
      this.props.hideNavBar(true);
    }
  }

  logout = () => {
    this.props.logout()
    .then(() => this.props.navigator.replace({ id: 'landing', title: '' }));
  }
  logoutAll = () => {
    this.props.logoutAll()
    .then(() => this.props.navigator.replace({ id: 'landing', title: '' }));
  }

  render() {
    const { user } = this.props;
    const lastLogin = moment(user.last_login_at).format('DD/MM/YYYY HH:mm');
    return (
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={[header.h1, styles.username]}>{user.username}</Text>
          <Text>last login: {lastLogin}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.logout}>
          <Text style={styles.textButton}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.logoutAll}>
          <Text style={styles.textButton}>Logout every devices</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Profile.propTypes = {
  title: PropTypes.string,
  navigator: PropTypes.object,
  logout: PropTypes.func,
  logoutAll: PropTypes.func,
  hideNavBar: PropTypes.func,
  getMe: PropTypes.func,
  user: PropTypes.object
};

export default connect(
  (state) => ({
    loggingOut: state.session.loggingOut,
    user: state.session.user
  }),
  (dispatch) => ({
    hideNavBar: (hideNav) => dispatch(routing.actions.hideNavBar(hideNav)),
    logout: () => dispatch(session.actions.logout()),
    logoutAll: () => dispatch(session.actions.logoutAll()),
    getMe: () => dispatch(session.actions.getMe())
  })
)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 100,
    alignItems: 'center',
    backgroundColor: color.whiteBackground
  },
  textBox: {
    alignItems: 'center',
    marginBottom: 30
  },
  username: {
    color: color.green,
    marginBottom: 10
  },
  button: {
    backgroundColor: color.green,
    borderRadius: 5,
    marginBottom: 10
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10
  }
});
