import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { color, header } from '../../configs';

import { connect } from 'react-redux';
// import { app } from '../../redux/modules';

export class Page extends Component {
  state = {
  }

  render() {
    const { instructor } = this.props;
    return (
      <View style={styles.container}>
        <Image source={{uri: instructor.image}} style={styles.image} />
        <Text style={[styles.instructorName, header.h1]}>{instructor.name}</Text>
        <Text style={header.h2}>{instructor.email}</Text>
        <Text>{instructor.department}</Text>
        <Text>{instructor.faculty}</Text>
      </View>
    );
  }
}

Page.propTypes = {
  navigator: PropTypes.object,
  instructor: PropTypes.object
};

export default connect(
  (state) => ({
    instructor: state.instructor.instructor
  }),
  (dispatch) => ({
  })
)(Page);

const imageSize = 180;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    marginTop: 30
  },
  image: {
    width: imageSize,
    height: imageSize,
    margin: 10,
    borderRadius: 10
  },
  instructorName: {
    color: color.green,
    textAlign: 'center'
  }
});

// const instructor = {
//   name: 'ธนาวินท์ รักธรรมานนท์',
//   email: 'fengtwr@ku.ac.th',
//   image: 'https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg',
//   department: 'ภาควิชาวิศวกรรมคอมพิวเตอร์',
//   faculty: 'คณะวิศวกรรมศาสตร์'
// };
