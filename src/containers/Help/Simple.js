import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  Text,
  Dimensions
} from 'react-native';
import { header } from '../../configs/';
import simpleImage from './images/simple.png';

export default class Simple extends Component {
  render() {
    return (
      <ScrollView>
        <Text style={[header.h2, styles.title]}>วิธีการอัดวิดีโอ</Text>
        <Image
          source={simpleImage}
          resizeMode="contain"
          style={styles.image}/>
        <View style={styles.detail}>
          <Text>1. เลือกห้องเรียนที่จะอัดวิดีโอ</Text>
          <Text>2. กดปุ่มเริ่มอัดวิดีโอ</Text>
          <Text>3. เมื่อต้องการจะหยุด กดปุ่มหยุดอัดวิดีโอ</Text>
        </View>
      </ScrollView>
    );
  }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 10
  },
  image: {
    width,
    height: 280
  },
  detail: {
    padding: 20
  }
});
