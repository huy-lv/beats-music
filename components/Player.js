import {
  Animated,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { styles, colors } from './styles';
import { Svg, Audio } from 'expo';
const { height, width } = Dimensions.get('window');

import BeatsText from './BeatsText';

const playerBlack = '#171717';
const playerSize = 50;
export default class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.state = {
      // 	playbackInstanceName: LOADING_STRING,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
    };
  }
  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.playingTrack !== null) {
      this._loadNewPlaybackInstance(true, nextProps.playingTrack.previewURL);
    }
  }
  async _loadNewPlaybackInstance(playing, url) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }
    const source = { uri: url };
    const initialStatus = {
      shouldPlay: playing, //playing,
    };

    const { sound, status } = await Audio.Sound.create(
      source,
      initialStatus,
      this._onPlaybackStatusUpdate
    );
    this.playbackInstance = sound;

    this._updateScreenForLoading(false);
  }
  _onPlaybackStatusUpdate = status => {
    console.log(status);
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        volume: status.volume,
      });
      if (status.didJustFinish) {
        // this._advanceIndex(true);
        // this._updatePlaybackInstanceForIndex(true);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };
  async _updatePlaybackInstanceForIndex(playing) {
    // this._updateScreenForLoading(true);

    this._loadNewPlaybackInstance(playing, this.props.playingTrack.previewURL);
  }
  _onPlayPausePressed = () => {
    console.log('tooggle pressplaypause');
    console.log(this.playbackInstance);
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
  };

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        isPlaying: false,
        // playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true,
      });
    } else {
      this.setState({
        // playbackInstanceName: PLAYLIST[this.index].name,
        // portrait: PLAYLIST[this.index].image,
        isLoading: false,
      });
    }
  }
  render() {
    return (
      <Animated.View
        style={{
          zIndex: 100,
          minHeight: 77,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTopColor: '#313131',
          borderTopWidth: 1,
          backgroundColor: playerBlack,
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          transform: [
            {
              translateY: this.props.showPlayer.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 160],
              }),
            },
          ],
        }}>

        {this.props.playingTrack === null
          ? this.renderStartSentence()
          : this.renderTrack(this.props.playingTrack)}
        <View
          style={{
            width: 16,
            height: 16,
            top: -8,
            left: 28,
            borderColor: '#313131',
            borderTopWidth: 1,
            borderLeftWidth: 1,
            position: 'absolute',
            transform: [{ rotateZ: '45deg' }],
            backgroundColor: playerBlack,
          }}
        />
      </Animated.View>
    );
  }
  renderPlayButton() {
    return (
      <View
        style={{
          backgroundColor: 'black',
          width: playerSize,
          height: playerSize,
          borderRadius: playerSize,
          borderWidth: 4,
          borderColor: 'white',
          marginRight: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Svg height={42} width={36}>
          <Svg.G stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <Svg.G transform={{ translate: '0, -3' }} fill="#FFFFFF">
              <Svg.Path
                d="M13.7154565,11.9264523 L27.9139578,27.4771919 C29.0311239,28.7007547 28.9448723,30.5982904 27.7213094,31.7154565 C27.1685284,32.2201696 26.4470347,32.5 25.6985013,32.5 L-2.69850135,32.5 C-4.3553556,32.5 -5.69850135,31.1568542 -5.69850135,29.5 C-5.69850135,28.7514666 -5.41867095,28.0299729 -4.91395783,27.4771919 L9.28454352,11.9264523 C10.4017096,10.7028895 12.2992453,10.6166379 13.5228081,11.7338039 C13.5899085,11.7950695 13.6541909,11.8593519 13.7154565,11.9264523 Z"
                id="Triangle"
                x={33.5}
                y={13.5}
                scale={0.6}
                rotation={90}
              />
            </Svg.G>
          </Svg.G>
        </Svg>
      </View>
    );
  }
  renderPauseButton() {
    return (
      <View
        style={{
          backgroundColor: 'black',
          width: playerSize,
          height: playerSize,
          borderRadius: playerSize,
          borderWidth: 4,
          borderColor: 'white',
          marginRight: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 16,
            height: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
          }}>
          <View
            style={{ width: 6, backgroundColor: 'white', borderRadius: 2 }}
          />
          <View
            style={{ width: 6, backgroundColor: 'white', borderRadius: 2 }}
          />
        </View>
      </View>
    );
  }
  renderStartSentence = () => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={this.props.onPress}>
        {this.renderPlayButton()}

        <View>
          <BeatsText>
            PLAY NEW
          </BeatsText>
          <BeatsText>
            SENTENCE
          </BeatsText>
        </View>
      </TouchableOpacity>
    );
  };
  renderTrack = track => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this._onPlayPausePressed}>
          {this.state.isPlaying == true
            ? this.renderPauseButton()
            : this.renderPlayButton()}
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 8,
            paddingVertical: 4,
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18,
              marginBottom: 2,
              opacity: 1,
            }}>
            {track.name}
          </Text>
          <Text numberOfLines={1} style={{ opacity: 0.7, color: 'white' }}>
            {track.artistName}
          </Text>
        </View>
        {this.state.isLoading === true || this.state.isBuffering === true
          ? <ActivityIndicator animating />
          : null}
      </View>
    );
  };
}
