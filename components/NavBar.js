import { View, Image } from 'react-native';
import React from 'react';
import { styles, colors } from './styles';

const logoSize = 36;

export default class NavBar extends React.Component {
  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.grey,
          borderBottomColor: '#313131',
          borderBottomWidth: 1,
        }}>
        <Image
          style={{ width: logoSize, height: logoSize, margin: 10 }}
          source={{
            uri: 'https://seeklogo.com/images/B/beats-music-logo-7991A4986B-seeklogo.com.png',
          }}
        />
      </View>
    );
  }
}
