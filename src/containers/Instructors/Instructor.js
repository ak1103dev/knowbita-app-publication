import React, { Component, PropTypes } from 'react';
import {
  StyleSheet
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Videos from './Videos';
import Courses from './Courses';
import About from './About';
import { color, header } from '../../configs';

import { connect } from 'react-redux';
import { routing, instructor } from '../../redux/modules';

const name = [
  'Videos',
  'Courses',
  'About'
];

export class Instructor extends Component {
  state = {
  }
  componentDidMount() {
    this.props.hideNavBar(false);
    Promise.all([
      this.props.loadInstructorAbout(this.props.route.params.id),
      this.props.loadInstructorVideos({
        id: this.props.route.params.id,
        page: 0
      }),
      this.props.loadInstructorCourses({
        id: this.props.route.params.id,
        page: 0
      })
    ]);
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
        <Videos tabLabel={name[0]} navigator={this.props.navigator} route={this.props.route}/>
        <Courses tabLabel={name[1]} navigator={this.props.navigator} route={this.props.route}/>
        <About tabLabel={name[2]} navigator={this.props.navigator} />
      </ScrollableTabView>
    );
  }
}

Instructor.propTypes = {
  hideNavBar: PropTypes.func,
  navigator: PropTypes.object,
  route: PropTypes.object,
  loadInstructorAbout: PropTypes.func,
  loadInstructorVideos: PropTypes.func,
  loadInstructorCourses: PropTypes.func,
  videoPage: PropTypes.number,
  coursePage: PropTypes.number
};

export default connect(
  (state) => ({
    videoPage: state.instructor.videoPage,
    coursePage: state.instructor.coursePage
  }),
  (dispatch) => ({
    hideNavBar: (hideNav) => dispatch(routing.actions.hideNavBar(hideNav)),
    loadInstructorAbout: (id) => dispatch(instructor.actions.loadInstructorAbout(id)),
    loadInstructorVideos: ({ id, page }) => dispatch(instructor.actions.loadInstructorVideos({ id, page })),
    loadInstructorCourses: ({ id, page }) => dispatch(instructor.actions.loadInstructorCourses({ id, page }))
  })
)(Instructor);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    top: 60
  }
});
