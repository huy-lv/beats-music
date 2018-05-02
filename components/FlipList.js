import React from 'react';
import { Animated } from 'react-native';

class FlipList extends React.Component {
  constructor(props) {
    super(props);
    this.animationValues = [];
    for (var i = 0; i < this.props.children.length; i++) {
      this.animationValues[i] = new Animated.Value(0);
    }
  }
  resetAnimations() {
    this.animationValues.map(animatedValue => {
      animatedValue.setValue(0);
    });
  }
  componentDidMount() {
    this.resetAnimations();
    let animationsToRun = [];
    this.animationValues.map(animatedValue => {
      animationsToRun.push(
        Animated.sequence([
          Animated.delay(300),
          Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true
          }),
        ])
      );
    });
    Animated.stagger(60, animationsToRun).start();
  }
  render() {
    return this.props.children.map((child, index) => {
      return (
        <Animated.View
          style={{
            transform: [
              {
                translateY: this.animationValues[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [-8, 0],
                }),
              },
              {
                rotateX: this.animationValues[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: ['90deg', '0deg'],
                }),
              },
            ],
          }}
          key={'animated' + index}>
          {React.cloneElement(child)}
        </Animated.View>
      );
    });
  }
}
export default FlipList;
