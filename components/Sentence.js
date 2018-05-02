import { View, Image, Dimensions, Platform } from 'react-native';
import React from 'react';
import { styles, colors } from './styles';

var { height, width } = Dimensions.get('window');

import BeatsText from './BeatsText';
import MadLibText from './MadLibText';
import FlipList from './FlipList';

import words from '../assets/data/wordsWithGenres';

export default class Sentence extends React.Component {
  render() {
    let numItems = 9;
    return (
      <View style={styles.mainContainer}>
        <FlipList key="sentence">
          <BeatsText style={styles.beatsTextFaded}>
            I'M
          </BeatsText>
          <MadLibText
            delay={2}
            numItems={numItems}
            backgroundColor="#DE2240"
            onPress={() => this.props.showWordIndexAndHidePlayer(0)}>
            {words[0][this.props.wordChoiceIndices[0]].name}
          </MadLibText>
          <BeatsText style={styles.beatsTextFaded}>
            & FEEL LIKE
          </BeatsText>
          <MadLibText
            delay={4}
            numItems={numItems}
            backgroundColor="#C22452"
            onPress={() => this.props.showWordIndexAndHidePlayer(1)}>
            {words[1][this.props.wordChoiceIndices[1]].name}
          </MadLibText>
          <BeatsText style={styles.beatsTextFaded}>
            WITH
          </BeatsText>
          <MadLibText
            delay={6}
            numItems={numItems}
            backgroundColor="#A22464"
            onPress={() => this.props.showWordIndexAndHidePlayer(2)}>
            {words[2][this.props.wordChoiceIndices[2]].name}
          </MadLibText>
          <BeatsText style={styles.beatsTextFaded}>
            TO
          </BeatsText>
          <MadLibText
            delay={8}
            numItems={numItems}
            backgroundColor="#832879"
            onPress={() => this.props.showWordIndexAndHidePlayer(3)}>
            {words[3][this.props.wordChoiceIndices[3]].name}
          </MadLibText>
        </FlipList>
      </View>
    );
  }
}
