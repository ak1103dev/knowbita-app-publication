import {
  StyleSheet,
  Dimensions
} from 'react-native';
import { color } from '../../configs';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width,
    height: 205
  },
  containerFull: {
    backgroundColor: 'black',
    width: height + 7,
    height: width + 7
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  controller: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  header: {
    padding: 3
  },
  name: {
    color: '#FFF'
  },
  playingControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 70,
    paddingRight: 70,
    alignItems: 'center'
  },
  trackingControls: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 8,
    left: 5,
    right: 5
  },
  currentTime: {
    color: color.green
  },
  durationTime: {
    color: '#FFF'
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
    alignSelf: 'center'
  },
  expandButton: {
    paddingLeft: 7,
    paddingRight: 7
  },
  playerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
