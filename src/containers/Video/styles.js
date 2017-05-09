import {
  StyleSheet
} from 'react-native';
import { color } from '../../configs';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  content: {
    marginBottom: 205
  },
  info: {
    padding: 10,
    borderBottomColor: color.grayBorder,
    borderBottomWidth: 1
  },
  tags: {
    flexDirection: 'row',
    marginTop: 3
  },
  tag: {
    color: '#FFF',
    backgroundColor: color.orange,
    padding: 5,
    marginRight: 5
  },
  lastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  instructor: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: color.grayBorder,
    borderTopWidth: 1,
    marginTop: 5
  },
  instructorImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 5,
    marginRight: 5
  },
  instructorName: {
    color: color.green
  },
  downloadedProgress: {
    alignSelf: 'center',
    marginRight: 3
  },
  loader: {
    flex: 1
  }
});
export default styles;
