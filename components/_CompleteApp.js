import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import { Font } from 'expo';
import { styles } from './styles';
import NavBar from './NavBar';
import TabBar from './TabBar';
import Player from './Player';
import Sentence from './Sentence';
import WordChoiceList from './WordChoiceList';
import PlaylistView from './views/PlaylistView';
import words from '../assets/data/wordsWithGenres';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editWordIndex: null,
      wordChoiceIndices: [0, 0, 0, 0],
      tracks: null,
      playingTrack: null,
      fontLoaded: false,

      showPlayer: new Animated.Value(0),
      isPlaylistViewVisible: new Animated.Value(1),
    };
    this.descriptors = ["I'M", '& FEEL LIKE', 'WITH', 'TO'];

    (async () => {
      await Font.loadAsync({
        Geometric_706_Black_BT: require('../assets/fonts/Geometric_706_Black_BT.ttf'),
      });
      this.setState({ fontLoaded: true });
    })();
  }

  render() {
    if (this.state.fontLoaded == false) {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ActivityIndicator animating style={{ flex: 1 }} />
          </SafeAreaView>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" />
          <NavBar />
          <TabBar />
          {this._renderPage(this.state.editWordIndex)}
          {this._renderPlaylistView()}
          {this._renderPlayer()}
        </SafeAreaView>
      </View>
    );
  }
  _renderPlaylistView() {
    return (
      <PlaylistView
        wordChoiceIndices={this.state.wordChoiceIndices}
        tracks={this.state.tracks}
        setPlayingTrack={track => {
          this.setState({ playingTrack: track });
        }}
        isPlaylistViewVisible={this.state.isPlaylistViewVisible}
        hidePlaylistView={() => {
          Animated.timing(this.state.isPlaylistViewVisible, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }).start();
          this.setState({ playingTrack: null });
        }}
      />
    );
  }
  _renderPlayer() {
    return (
      <Player
        playingTrack={this.state.playingTrack}
        showPlayer={this.state.showPlayer}
        onPress={() => {
          let genreMap0 = words[0][this.state.wordChoiceIndices[0]].genreMap;
          let genreMap1 = words[1][this.state.wordChoiceIndices[1]].genreMap;
          let genreMap2 = words[2][this.state.wordChoiceIndices[2]].genreMap;
          let genreMap3 = words[3][this.state.wordChoiceIndices[3]].genreMap;

          let first3GenreMap = [].concat.apply(
            [],
            [genreMap0, genreMap1, genreMap2]
          );
          // console.log(fullGenreMap)

          function getHighestScoreId(genreMap) {
            let highestScoreId = null;
            let highestScore = 0;

            let scores = {};
            for (var genreIndex in genreMap) {
              let genre = genreMap[genreIndex];
              let newScore = 0;
              if (genre.genreId in scores) {
                newScore = scores[genre.genreId] + genre.score;
              } else {
                newScore = genre.score;
              }
              scores[genre.genreId] = newScore;
              if (newScore > highestScore) {
                highestScore = newScore;
                highestScoreId = genre.genreId;
              }
            }
            console.log('highestScoreId ' + highestScoreId);
            console.log('highestScore ' + highestScore);
            return highestScoreId;
          }

          fetch(
            'https://api.napster.com/v2.2/genres/' +
              getHighestScoreId(genreMap3) +
              ',' +
              getHighestScoreId(first3GenreMap) +
              '/tracks/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm'
          ).then(data => {
            data.json().then(dataJSON => {
              // console.log(dataJSON);
              this.setState({ tracks: dataJSON.tracks });
              Animated.timing(this.state.isPlaylistViewVisible, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
              }).start();
            });
          });
        }}
      />
    );
  }
  _renderPage(editWordIndex) {
    if (editWordIndex == null) {
      return (
        <Sentence
          showWordIndexAndHidePlayer={this.showWordIndexAndHidePlayer}
          wordChoiceIndices={this.state.wordChoiceIndices}
        />
      );
    } else {
      return (
        <WordChoiceList
          pickWord={wordChoiceIndices => {
            this.setState({
              wordChoiceIndices: wordChoiceIndices,
              editWordIndex: null,
            });
          }}
          showPlayer={this.state.showPlayer}
          wordChoiceIndices={this.state.wordChoiceIndices}
          editWordIndex={this.state.editWordIndex}
          descriptor={this.descriptors[this.state.editWordIndex]}
        />
      );
    }
  }
  showWordIndexAndHidePlayer = index => {
    this.setState({ editWordIndex: index });
    Animated.timing(this.state.showPlayer, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.in(Easing.ease),
    }).start();
  };
}
