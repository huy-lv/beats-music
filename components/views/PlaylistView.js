import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Animated,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { colors } from '../styles';
import BeatsText from '../BeatsText';
import words from '../../assets/data/wordsWithGenres';

const { height } = Dimensions.get('window');

export default class PlaylistView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateY: this.props.isPlaylistViewVisible.interpolate({
                inputRange: [0, 1],
                outputRange: [0, height],
              }),
            },
          ],
          position: 'absolute',
          top: 77,
          width: '100%',
          height: height,
          paddingBottom: 77,
          backgroundColor: colors.grey,
        }}>
        {/*<ImageBackground
          source={{ uri: 'http://iovine-young.usc.edu/image/1129' }}
          style={{
            minHeight: 300,
            backgroundColor: '#111',
            borderBottomColor: '#313131',
            borderBottomWidth: 1,
          }}>*/}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.props.hidePlaylistView}
          style={{
            padding: 16,
            backgroundColor: '#00000050',
            alignSelf: 'stretch',
            borderBottomColor: '#313131',
            borderBottomWidth: 1,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            {/* Weird text wrapping bug*/}
            <Text style={{ fontSize: 1, opacity: 0 }}>{'.'}</Text>
            <BeatsText style={{ opacity: 0.5 }}>I'M </BeatsText>
            <BeatsText>
              {words[0][this.props.wordChoiceIndices[0]].name}
            </BeatsText>
            <BeatsText style={{ opacity: 0.5 }}> & FEEL LIKE </BeatsText>
            <BeatsText>
              {words[1][this.props.wordChoiceIndices[1]].name}
            </BeatsText>
            <BeatsText style={{ opacity: 0.5 }}> WITH </BeatsText>
            <BeatsText>
              {words[2][this.props.wordChoiceIndices[2]].name}
            </BeatsText>
            <BeatsText style={{ opacity: 0.5 }}> TO </BeatsText>
            <BeatsText>
              {words[3][this.props.wordChoiceIndices[3]].name}
            </BeatsText>
          </Text>
        </TouchableOpacity>
        {/*</ImageBackground>*/}
        {this.renderTracks(this.props.tracks)}
      </Animated.View>
    );
  }
  renderTracks = tracks => {
    if (tracks == null) {
      return null;
    } else {
      let cellSize = 72;
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: colors.cellBackgroundColor }}>
          {tracks.map((track, index) => {
            // console.log(track);
            return (
              <TouchableHighlight
                key={'track' + index}
                activeOpacity={1}
                onPress={() => {
                  this.props.setPlayingTrack(track);
                }}
                underlayColor="#ddd">
                <View
                  style={{
                    height: cellSize,
                    flexDirection: 'row',
                    width: '100%',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 0.5,
                  }}>
                  <Image
                    source={{
                      uri: 'http://direct.rhapsody.com/imageserver/v2/albums/' +
                        track.albumId +
                        '/images/300x300.jpg',
                    }}
                    style={{
                      backgroundColor: '#808080',
                      height: cellSize,
                      width: cellSize,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      justifyContent: 'center',
                    }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        marginBottom: 2,
                        opacity: 0.9,
                      }}>
                      {track.name}
                    </Text>
                    <Text numberOfLines={1} style={{ opacity: 0.6 }}>
                      {track.artistName}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            );
          })}
          <View style={{ height: 77, width: 1 }} />
        </ScrollView>
      );
    }
  };
}
