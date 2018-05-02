import { Text } from 'react-native';
import React from 'react';
import { styles } from './styles';

export default class BeatsText extends React.Component {
  render() {
    return (
      <Text style={[styles.beatsText, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}
BeatsText.defaultProps = {
  style: null,
};
