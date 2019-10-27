import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';

export default class FeedItems extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  onPressReadMore = () => {
    const { item: 
      { url } 
    } = this.props;

    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  }

  render() {
    const { item: 
      { title, urlToImage } 
    } = this.props;

    return (
      <View style={styles.card}>
        <Image style={styles.images} source={{ uri: urlToImage }} />
        <Text>{title}</Text>
        <TouchableOpacity style={styles.button} onPress={this.onPressReadMore}>
          <Text style={styles.textBtn}>Read More</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingVertical: 10
  },

  images: {
    width: 400,
    height: 300
  },

  button: {
    backgroundColor: 'blue',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10
  },

  textBtn: {
    color: '#fff'
  }
});
