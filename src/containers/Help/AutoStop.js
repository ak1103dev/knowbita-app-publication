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
import autoStopImage from './images/autoStop.png';

export default class AutoStop extends Component {
  render() {
    return (
      <ScrollView>
        <Text style={[header.h2, styles.title]}>วิธีการตั้งเวลาหยุดล่วงหน้า</Text>
        <Image
          source={autoStopImage}
          resizeMode="contain"
          style={styles.image}/>
        <View style={styles.detail}>
          <Text>1. ติ๊กที่ Set stop time</Text>
          <Text>
            {'2. ใส่เวลาที่ต้องการจะหยุดด้วยเวลานับจากปัจจุบัน หรือเวลาตามนาฬิกา'
            .concat(' จากนั้นกดปุ่ม OK เพื่อยืนยันเวลาหยุด')}
          </Text>
          <Text>*** เมื่อถึงเวลาหยุด จะหยุดอัดวิดีโอโดยอัตโนมัติ</Text>
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
    paddingTop: 10,
    paddingBottom: 10
  },
  image: {
    width,
    height: 280
  },
  detail: {
    padding: 20
  }
});
