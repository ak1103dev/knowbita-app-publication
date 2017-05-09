import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { InstructorCard } from '../../components';
import { color } from '../../configs';

import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { instructor } from '../../redux/modules';

export class Instructors extends Component {
  state = {
    page: 1,
    scrollHeight: 0
  }
  componentDidMount() {
    this.props.loadInstructors(0);
  }

  goToInstructor = (id, name) => {
    this.props.navigator.push({
      id: 'instrutor',
      title: name,
      params: { id }
    });
  }
  onScroll = (event) => {
    const yPosition = event.nativeEvent.contentOffset.y;
    const contentHeight = 1200;
    const { scrollHeight } = this.state;
    if (yPosition + contentHeight > scrollHeight && !this.props.loading) {
      this.props.loadInstructors(this.state.page);
      this.setState({ page: this.state.page + 1 });
    }
  }
  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ scrollHeight: contentHeight });
  }

  render() {
    const { instructors } = this.props;
    if (isEmpty(instructors)) {
      return (
        <ActivityIndicator size={50} color={color.green} />
      );
    }
    return (
      <ScrollView style={styles.container}
        onScroll={this.onScroll}
        onContentSizeChange={this.onContentSizeChange}>
        {
          instructors.map((item, i) =>
            <InstructorCard key={i} info={item} goTo={this.goToInstructor}/>
          )
        }
      </ScrollView>
    );
  }
}

Instructors.propTypes = {
  navigator: PropTypes.object,
  loadInstructors: PropTypes.func,
  instructors: PropTypes.array,
  loading: PropTypes.bool
};

export default connect(
  (state) => ({
    instructors: state.instructor.instructors,
    loading: state.instructor.loading
  }),
  (dispatch) => ({
    loadInstructors: (page) => dispatch(instructor.actions.loadInstructors(page))
  })
)(Instructors);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginBottom: 60
  }
});

// const info = [
//   {
//     name: 'ธนาวินท์ รักธรรมานนท์',
//     email: 'fengtwr@ku.ac.th',
//     image: 'https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg',
//     num_videos: 200,
//     num_courses: 20,
//     department: 'ภาควิชาวิศวกรรมคอมพิวเตอร์',
//     faculty: 'คณะวิศวกรรมศาสตร์'
//   },
//   {
//     name: 'ธนาวินท์ รักธรรมานนท์',
//     email: 'fengtwr@ku.ac.th',
//     image: 'https://knowbita.cpe.ku.ac.th/images/avatars/no_avatar.png',
//     num_videos: 200,
//     num_courses: 20,
//     department: 'ภาควิชาวิศวกรรมคอมพิวเตอร์',
//     faculty: 'คณะวิศวกรรมศาสตร์'
//   },
//   {
//     name: 'ธนาวินท์ รักธรรมานนท์',
//     email: 'fengtwr@ku.ac.th',
//     image: 'https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg',
//     num_videos: 200,
//     num_courses: 20,
//     department: 'ภาควิชาวิศวกรรมคอมพิวเตอร์',
//     faculty: 'คณะวิศวกรรมศาสตร์'
//   },
//   {
//     name: 'ธนาวินท์ รักธรรมานนท์',
//     email: 'fengtwr@ku.ac.th',
//     image: 'https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg',
//     num_videos: 200,
//     num_courses: 20,
//     department: 'ภาควิชาวิศวกรรมคอมพิวเตอร์',
//     faculty: 'คณะวิศวกรรมศาสตร์'
//   }
// ];
