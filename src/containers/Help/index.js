import React, { Component, PropTypes } from 'react';
import {
  StyleSheet
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { color, header } from '../../configs';

import Simple from './Simple';
import AutoStop from './AutoStop';
import AutoForm from './AutoForm';

import { connect } from 'react-redux';
import { routing } from '../../redux/modules';

const name = [
  'Simple',
  'Auto Stop',
  'Auto Form'
];

export class Help extends Component {
  state = {
  }
  componentDidMount() {
    this.props.hideNavBar(false);
  }

  render() {
    return (
      <ScrollableTabView
        style={styles.container}
        tabBarUnderlineStyle={{backgroundColor: color.green}}
        tabBarActiveTextColor={color.green}
        tabBarInactiveTextColor={color.grayText}
        tabBarTextStyle={header.h2}
      >
        <Simple tabLabel={name[0]} />
        <AutoStop tabLabel={name[1]} />
        <AutoForm tabLabel={name[2]} />
      </ScrollableTabView>
    );
  }
}

Help.propTypes = {
  hideNavBar: PropTypes.func,
  navigator: PropTypes.object
};

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    hideNavBar: (hideNav) => dispatch(routing.actions.hideNavBar(hideNav))
  })
)(Help);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    top: 60,
    marginBottom: 60
  }
});
