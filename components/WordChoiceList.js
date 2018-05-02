import { Animated, View, Easing, ScrollView } from 'react-native';
import React from 'react';
import { styles, colors } from './styles';

import chroma from 'chroma-js';

import BeatsText from './BeatsText';
import MadLibText from './MadLibText';
import FlipList from './FlipList';

import words from '../assets/data/wordsWithGenres';

export default class WordChoiceList extends React.Component {
  render() {
    let editWordIndex = this.props.editWordIndex;
    let descriptor = this.props.descriptor;
    let wordSet = words[editWordIndex];
    let colorScale = chroma
      .scale([colors.startColor, colors.endColor])
      .colors(wordSet.length);
    let items = [];
    items.push(
      <BeatsText key="descriptor_word" style={styles.beatsTextFaded}>
        {descriptor}
      </BeatsText>
    );
    wordSet.map((word, index) => {
      items.push(
        <MadLibText
          delay={index}
          numItems={wordSet.length}
          onPress={() => {
            let wordChoiceIndices = this.props.wordChoiceIndices;
            wordChoiceIndices[editWordIndex] = index;
            this.props.pickWord(wordChoiceIndices);
            Animated.timing(this.props.showPlayer, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
              easing: Easing.out(Easing.ease),
            }).start();
          }}
          color={
            index !== this.props.wordChoiceIndices[editWordIndex]
              ? '#171717'
              : null
          }
          key={'word' + index}
          backgroundColor={colorScale[index]}>
          {word.name}
        </MadLibText>
      );
    });
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <FlipList key="word_choices">
            {items}
          </FlipList>
        </View>
      </ScrollView>
    );
  }
}
