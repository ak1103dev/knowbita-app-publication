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
import autoFormImage from './images/autoForm.png';

export default class AutoForm extends Component {
  render() {
    return (
      <ScrollView>
        <Text style={[header.h2, styles.title]}>วิธีการใส่ข้อมูลของวิดีโอ</Text>
        <Image
          source={autoFormImage}
          resizeMode="contain"
          style={styles.image}/>
        <View style={styles.detail}>
          <Text>1. ติ๊กที่ Auto send form</Text>
          <Text>2. กรอกข้อมูลในฟอร์มให้เรียบร้อย</Text>
          <Text>   2.1 สามารถเลือก ได้ไม่เกิน 4 Video Categories</Text>
          <Text>   2.2 แต่ละ tag คั่นด้วย commas</Text>
          <Text>3. กดปุ่ม Save เพื่อยืนยันข้อมูล</Text>
          <Text>4. ถ้าต้องการแก้ไขข้อมูล กดปุ่ม Edit</Text>
          <Text>*** ใส่ข้อมูลก่อนส่งวิดีโอ</Text>
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
