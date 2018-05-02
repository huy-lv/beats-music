import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

var fontSize = 20;

if (width > 400) {
  fontSize = 24;
}

const colors = {
  grey: '#212121',
  startColor: '#DE2240',
  endColor: '#832879',
  cellBackgroundColor: '#E9EAEC',
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.grey,
  },
  pager: {
    backgroundColor: 'black',
    paddingVertical: 20,
  },
  beatsText: {
    fontSize: fontSize,
    textAlign: 'center',
    color: 'white',
    fontWeight: '900',
    fontFamily: 'Geometric_706_Black_BT',
  },
  beatsTextFaded: {
    marginTop: 4,
    marginBottom: 4,
    opacity: 0.66,
  },
});

module.exports = {
  colors,
  styles,
};
