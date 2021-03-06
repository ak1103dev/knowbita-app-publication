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
import { routing, course } from '../../redux/modules';

class Courses extends Component {
  state = {
    page: 1,
    scrollHeight: 0
  }

  componentDidMount() {
    this.props.loadCourses(0);
  }

  goToVideo = (id) => {
    this.props.changeRoute({ id: 'video', title: this.props.title, index: this.props.index });
    this.props.navigator.push({ id: 'video', title: '', params: { id, isCourse: true, index: 0 } });
  }
  onScroll = (event) => {
    const yPosition = event.nativeEvent.contentOffset.y;
    const contentHeight = 2500;
    const { scrollHeight } = this.state;
    if (yPosition + contentHeight > scrollHeight && !this.props.loading) {
      this.props.loadCourses(this.state.page);
      this.setState({ page: this.state.page + 1 });
    }
  }
  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ scrollHeight: contentHeight });
  }

  render() {
    const { courses } = this.props;
    if (isEmpty(courses)) {
      return (
        <ActivityIndicator size={50} color={color.green} />
      );
    }
    return (
      <ScrollView style={styles.container}
        onScroll={this.onScroll}
        onContentSizeChange={this.onContentSizeChange}>
        {
          courses.map((item, i) => {
            return <Card key={i} goTo={this.goToVideo} info={item} isCourse />;
          })
        }
      </ScrollView>
    );
  }
}

Courses.propTypes = {
  navigator: PropTypes.object,
  changeRoute: PropTypes.func,
  title: PropTypes.string,
  index: PropTypes.number,
  loadCourses: PropTypes.func,
  courses: PropTypes.array,
  loading: PropTypes.bool
};

export default connect(
  (state) => ({
    message: state.app.message,
    title: state.routing.title,
    index: state.routing.index,
    courses: state.course.courses,
    loading: state.course.loading
  }),
  (dispatch) => ({
    changeRoute: (route) => dispatch(routing.actions.changeRoute(route)),
    loadCourses: (page) => dispatch(course.actions.loadCourses(page))
  })
)(Courses);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginBottom: 60
  }
});

// const info = [
//   {
//     name: '01204313 Algorithm 2016',
//     instructor: {
//       name: 'ธนาวินท์ รักธรรมานนท์',
//       image: 'https://knowbita.cpe.ku.ac.th/images/avatars/no_avatar.png'
//     },
//     tags: ['CPE', 'SKE'],
//     image: 'https://knowbita.cpe.ku.ac.th/files/thumbs/14852327003229c-1.jpg',
//     num_videos: '20'
//   },
//   {
//     name: '01204313 Algorithm 2016',
//     instructor: {
//       name: 'ธนาวินท์ รักธรรมานนท์',
//       image: 'https://knowbita.cpe.ku.ac.th/images/avatars/no_avatar.png'
//     },
//     tags: ['CPE', 'SKE'],
//     image: 'https://knowbita.cpe.ku.ac.th/files/thumbs/14852327003229c-1.jpg',
//     created_at: '2 days ago',
//     num_videos: '20',
//     time_duration: '01:55:08'
//   }
// ];
