import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import Loadercomponent from '../../components/Loadercomponent/Loadercomponent';

const { width, height } = Dimensions.get('window');

const DetailsScreen = (props) => {
  const navigation = useNavigation();
  const product = useSelector((state) => state?.newAuth?.ProductDetails);
  const carouselRef = useRef(null);

  const renderImageItem = ({ item, index }) => (
    <Image style={styles.carouselImage} source={{ uri: item }} />
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const onSnapToItem = (index) => {
    setActiveIndex(index);

    if (index === product.images.length - 1) {
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.snapToItem(0);
        }
      }, 500);
    }
  };

  useEffect(() => {
    
    setTimeout(() => {
      setIsLoading(false); 
    }, 2000); 
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.screenName}>Details</Text>
        <View style={{ width: 24, marginRight: 20 }} />
      </View>

      <ScrollView style={styles.container}>
        {isLoading ? (
          <Loadercomponent Visible={true} />
        ) : (
          <>
            <Carousel
              ref={carouselRef}
              data={product.images}
              renderItem={renderImageItem}
              sliderWidth={380}
              itemWidth={300}
              autoplay={true}
              autoplayInterval={3000}
              onSnapToItem={onSnapToItem}
            />

            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productDescription}>{product.description}</Text>
              <Text style={styles.productPrice}>
                Price: ${product.price.toFixed(2)}
              </Text>
              <Text style={styles.productRating}>Rating: {product.rating}</Text>
            </View>

            <TouchableOpacity style={styles.addToCartButton}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  carouselImage: {
    width: 300,
    borderRadius: 13,
    height: 300,
  },
  productDetails: {
    marginTop: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    marginTop: 8,
    color: '#666',
  },
  productPrice: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#FF5733',
    fontSize: 20,
  },
  productRating: {
    marginTop: 8,
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#3E64FF',
    padding: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  addToCartButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#3E64FF',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenName: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DetailsScreen;
