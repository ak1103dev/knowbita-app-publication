import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { List } from '../../components';
import { color } from '../../configs';

import { connect } from 'react-redux';
import { routing, search } from '../../redux/modules';

export class Search extends Component {
  state = {
    word: '',
    page: 1,
    scrollHeight: 0,
    isUsedToSearch: false
  }

  componentDidMount() {
    this.props.hideNavBar(true);
  }
  componentWillUnmount() {
    this.props.hideNavBar(false);
  }

  onScroll = (event) => {
    const yPosition = event.nativeEvent.contentOffset.y;
    const contentHeight = 700;
    const { scrollHeight, word, page } = this.state;
    if (yPosition + contentHeight > scrollHeight && !this.props.loadingMore) {
      // console.log('load', yPosition, contentHeight, scrollHeight);
      this.props.searchMore({ word, page });
      this.setState({ page: this.state.page + 1 });
    }
  }
  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ scrollHeight: contentHeight });
  }

  goToCourseVideo = (id) => {
    this.props.navigator.push({ id: 'video', title: '', params: { id, isCourse: true, index: 0 } });
  }
  goToVideo = (id) => {
    this.props.navigator.push({ id: 'video', title: '', params: { id } });
  }

  onSubmit = () => {
    const { word } = this.state;
    this.props.search({ word });
    this.setState({ isUsedToSearch: true });
  }
  setSearchingWord = (word) => {
    this.setState({ word });
  }

  render() {
    const { courses, videos } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.searchBox} elevation={3}>
          <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigator.pop()}>
            <Icon
              name="chevron-left"
              size={30}
              color={color.grayText}
            />
          </TouchableOpacity>
          <TextInput style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={color.grayText}
            returnKeyType="search"
            underlineColorAndroid={color.green}
            onChangeText={this.setSearchingWord}
            onSubmitEditing={this.onSubmit}
          />
          <TouchableOpacity style={styles.searchButton} onPress={this.onSubmit}>
            <Icon
              name="search"
              size={30}
              color={color.grayText}
            />
          </TouchableOpacity>
        </View>
        {
          this.props.loading
          ? <ActivityIndicator size={40} color={color.green} style={{ marginTop: 10 }}/>
          : <ScrollView
            onScroll={this.onScroll}
            onContentSizeChange={this.onContentSizeChange}>
            {
              (courses.length === 0 && videos.length === 0) && this.state.isUsedToSearch &&
              <Text style={styles.noResult}>--- No result ---</Text>
            }
            {
              courses.map((course, i) => {
                return (
                  <List key={i} goTo={() => this.goToCourseVideo(course._id)}
                    info={course} isCourse isTag />
                );
              })
            }
            {
              videos.map((video, i) => {
                return (
                  <List key={i} goTo={() => this.goToVideo(video._id)} info={video} isTag />
                );
              })
            }
          </ScrollView>
        }
      </View>
    );
  }
}

Search.propTypes = {
  title: PropTypes.string,
  navigator: PropTypes.object,
  hideNavBar: PropTypes.func,
  search: PropTypes.func,
  searchMore: PropTypes.func,
  courses: PropTypes.array,
  videos: PropTypes.array,
  loading: PropTypes.bool,
  loadingMore: PropTypes.bool
};

export default connect(
  (state) => ({
    courses: state.search.courses,
    videos: state.search.videos,
    loading: state.search.loading,
    loadingMore: state.search.loadingMore
  }),
  (dispatch) => ({
    hideNavBar: (hideNav) => dispatch(routing.actions.hideNavBar(hideNav)),
    search: ({ word }) => dispatch(search.actions.search({ word })),
    searchMore: ({ word, page }) => dispatch(search.actions.searchMore({ word, page }))
  })
)(Search);

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  backButton: {
    justifyContent: 'center',
    marginRight: 10
  },
  searchButton: {
    justifyContent: 'center',
    marginLeft: 10
  },
  searchBox: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: color.grayLight
  },
  searchInput: {
    height: 50,
    width: width - 90,
    fontSize: 18
  },
  noResult: {
    textAlign: 'center',
    padding: 10
  }
});
