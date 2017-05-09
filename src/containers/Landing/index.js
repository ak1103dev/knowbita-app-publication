import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { color, header } from '../../configs';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { routing, session } from '../../redux/modules';

class Landing extends Component {
  state = {
    username: '',
    password: ''
  }

  componentDidMount() {
    AsyncStorage.multiGet(['access-token', 'cookies'])
    .then(([accessToken, cookies]) => {
      if (!isEmpty(accessToken[1]) && !isEmpty(cookies[1])) {
        this.props.navigator.replace({ id: 'app', title: 'Home', index: 0 });
        this.props.changeRoute({ id: 'app', title: 'Home', index: 0 });
      }
    });
  }

  login = () => {
    const { username, password } = this.state;
    const data = {
      username,
      password
    };
    this.props.login(data)
    .then(() => {
      this.props.navigator.replace({ id: 'app', title: 'Home', index: 0 });
      this.props.changeRoute({ id: 'app', title: 'Home', index: 0 });
    });
  }

  renderForm() {
    if (this.props.loading) {
      return (
        <View style={styles.loggingIn}>
          <Text style={styles.loggingInText}>Logging In</Text>
          <ActivityIndicator color={color.green} size={40} />
        </View>
      );
    }
    return (
      <View style={styles.loginBox}>
        <TextInput ref="username"
          style={styles.form} placeholder="Username"
          underlineColorAndroid={color.green}
          onSubmitEditing={() => this.refs.password.focus()}
          onChangeText={(username) => this.setState({ username })}
          returnKeyType="next" />
        <TextInput ref="password"
          style={styles.form} placeholder="Password"
          underlineColorAndroid={color.green} secureTextEntry
          onSubmitEditing={this.login}
          onChangeText={(password) => this.setState({ password })}
          returnKeyType="done" />
        <Text style={[styles.errorMessage, this.props.error && { marginBottom: 10 }]}>
          {this.props.error && this.props.errorMessage}
        </Text>
        <TouchableOpacity style={styles.button} onPress={this.login}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.name}>
            <Text style={{ color: '#000' }}>Know</Text>
            <Text style={{ color: color.green }}>Bita</Text>
          </Text>
          <Text style={header.h1}>ยินดีต้อนรับเข้าสู่</Text>
          <Text style={header.h2}>ระบบสื่อการเรียนการสอนออนไลน์</Text>
          <View style={styles.description}>
            <Text style={header.p}>คุณสามารถเริ่มศึกษาและเรียนรู้</Text>
            <Text style={header.p}>สื่อการเรียนการสอนแบบออนไลน์ของเรา</Text>
            <Text style={header.p}>ได้ทันทีเพียงแค่เลือกรับชมคอร์สที่คุณสนใจ</Text>
          </View>
        </View>
        { this.renderForm() }
        <KeyboardSpacer />
      </ScrollView>
    );
  }
}

Landing.propTypes = {
  navigator: PropTypes.object,
  changeRoute: PropTypes.func,
  user: PropTypes.object,
  login: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool
};

export default connect(
  (state) => ({
    loading: state.session.loggingIn,
    user: state.session.user,
    error: state.session.error,
    errorMessage: state.session.errorMessage
  }),
  (dispatch) => ({
    changeRoute: (route) => dispatch(routing.actions.changeRoute(route)),
    login: ({ username, password }) => dispatch(session.actions.login({ username, password }))
  })
)(Landing);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.whtiteBackground,
    paddingLeft: 15,
    paddingRight: 15
  },
  content: {
    flex: 1,
    alignItems: 'center'
  },
  name: {
    fontSize: 50,
    marginTop: 10,
    marginBottom: 20
  },
  description: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  loginBox: {
    flex: 1,
    marginTop: 30
  },
  form: {
    fontSize: 18,
    marginBottom: 10
  },
  button: {
    backgroundColor: color.green,
    borderRadius: 5
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10
  },
  errorMessage: {
    color: 'red',
    alignSelf: 'center'
  },
  loggingIn: {
    alignItems: 'center',
    marginTop: 30
  },
  loggingInText: {
    color: color.green,
    fontSize: 20,
    marginBottom: 30
  }
});
