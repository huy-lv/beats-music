import React from 'react';
import { Animated, View, TouchableOpacity, Dimensions, Easing } from 'react-native';
import BeatsText from './BeatsText';
const { height, width } = Dimensions.get('window');

class MadLibText extends React.Component {
  constructor(props) {
    super(props);
    this.slide = new Animated.Value(0);
  }
  componentDidMount() {
    Animated.timing(this.slide, {
        toValue: 1,
        duration: 400,
        delay: this.props.delay * 50 + this.props.numItems * 50,
        easing: Easing.out(Easing.ease)
      }).start()
    // Animated.sequence([
    //   Animated.delay(this.props.delay),
    //   Animated.spring(this.slide, {
    //     toValue: 1,
    //     speed: 0,
    //   }),
    // ]).start();
  }
  render() {
    return (
      <View
       
        style={{
          marginLeft: -6,
          marginVertical: 4,
          flexDirection: 'row',
          width: width-20,
          overflow: 'hidden'
        }}>
        <TouchableOpacity
         onPress={this.props.onPress}
          style={{
            padding: 6,
            paddingVertical: 3,
            backgroundColor: this.props.backgroundColor,
          }}>
          <BeatsText
            style={
              this.props.color != null ? { color: this.props.color } : null
            }>
            {this.props.children}
          </BeatsText>
        </TouchableOpacity>
        <Animated.View
          style={{
            width: this.slide.interpolate({
              inputRange: [0, 1],
              outputRange: [width, 0],
            }),
            
            backgroundColor: this.props.backgroundColor,
            alignSelf: 'stretch',
          }}
        />
      </View>
    );
  }
}
MadLibText.defaultProps = {
  color: null,
  onPress: () => {},
};
export default MadLibText;
