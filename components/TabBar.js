import { View, Image, Dimensions, Platform } from 'react-native'
import React from 'react'
import {styles, colors} from './styles'

var {height, width} = Dimensions.get('window');

import BeatsText from './BeatsText'

export default class TabBar extends React.Component{
  render(){
    return(
      <View style={styles.pager}>
          <BeatsText>
            THE SENTENCE
          </BeatsText>
          <View style={{
            width: 16,
            height: 16, 
            bottom: -8,
            left: width/2-8,
            position: 'absolute',
            transform: [
              { rotateZ: '45deg'},
            ],
            backgroundColor: colors.grey}}
          />
        </View>
    )
  }
}