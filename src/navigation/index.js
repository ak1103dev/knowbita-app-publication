import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Navigator,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { color } from '../configs';
import Scene from './Scene';

import { connect } from 'react-redux';

class Navigation extends Component {
  renderButton(id, title, iconName, navigator, route) {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="transparent"
        onPress={() => {
          if (id !== route.id) {
            navigator.push({ id, title, index: 1 });
          }
        }}
      >
        <Icon
          name={iconName}
          size={30}
          color="white"
        />
      </TouchableHighlight>
    );
  }
  renderScene(route, navigator) {
    return <Scene route={route} navigator={navigator} />;
  }
  renderLeftButton(route, navigator, index, navState) {
    if (index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          style={styles.backButton}
          onPress={() => {
            if (index > 0) {
              navigator.pop();
            }
          }}
        >
          <Icon
            name="chevron-left"
            size={30}
            color="white"
          />
        </TouchableHighlight>);
    }
    return null;
  }
  renderRightButton(route, navigator, index, navState) {
    if (route.id === 'video') {
      return null;
    }
    return (
      <View style={styles.buttonGroup}>
        {
          route.id === 'app' &&
          this.renderButton('search', 'Search', 'search', navigator, route)
        }
        {
          route.id === 'app' &&
          this.renderButton('profile', 'Profile', 'user-circle', navigator, route)
        }
        {
          this.props.user.is_instructor && route.id === 'app' &&
          this.renderButton('help', 'Help', 'question-circle', navigator, route)
        }
      </View>
    );
  }
  renderTitle(route, navigator, index, navState) {
    return (
      <Text style={styles.title} adjustsFontSizeToFit={true} numberOfLines={1}>
        {
          route.id === 'app' ? this.props.route.title : route.title
        }
      </Text>
    );
  }

  render() {
    const showNavigationBar = this.props.hideNav === false;
    console.log('nav', showNavigationBar);
    if (showNavigationBar) {
      return (
        <Navigator
          initialRoute={{ id: 'landing', title: '', index: 0 }}
          renderScene={this.renderScene.bind(this)}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: this.renderLeftButton.bind(this),
                RightButton: this.renderRightButton.bind(this),
                Title: this.renderTitle.bind(this)
              }}
              style={ showNavigationBar ? styles.navigationBar : {height: 0} }
            />
          }
        />
      );
    }
    return (
        <Navigator
          initialRoute={{ id: 'landing', title: '', index: 0 }}
          renderScene={this.renderScene.bind(this)}
        />
    );
  }
}

Navigation.propTypes = {
  route: PropTypes.object,
  hideNav: PropTypes.bool,
  user: PropTypes.object
};

export default connect(
  (state) => ({
    route: state.routing,
    hideNav: state.routing.hideNav,
    user: state.session.user
  }),
  (dispatch) => ({
  })
)(Navigation);

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: color.green
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 5
  },
  button: {
    width: 30,
    height: 30,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  backButton: {
    top: 10
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    top: 10,
    marginRight: 50
  }
});
