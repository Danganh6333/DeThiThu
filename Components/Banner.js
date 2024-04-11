import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Carousel from 'pinar';

const images = [
  require('../img/anh1.jpg'),
  require('../img/anh2.jpg'),
  require('../img/anh3.jpg'),
];

const Banner = () => {
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        loop={true}
        autoplay={true}
        style={styles.carousel}
        showsControls={false}
        dotStyle={styles.dotStyle}>
        {images.map((image, index) => (
          <Image source={image} style={styles.image} key={index} />
        ))}
      </Carousel>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  dotStyle: {
    width: 30,
    height: 3,
    backgroundColor: 'silver',
    marginHorizontal: 3,
    borderRadius: 4,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
    borderRadius: 20,
  },
  carousel: {
    height: '100%',
    width: '100%',
  },
  carouselContainer: {
    height: 220,
    marginHorizontal: 10,
    marginTop: 12,
    backgroundColor: 'transparent',
    marginBottom: 12,
  },
});
