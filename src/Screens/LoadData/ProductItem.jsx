import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {ProductDetails} from '../../Store/CounterSlice';

const ProductItem = ({item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.productItem}>
      <Image source={{uri: item.thumbnail}} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() => {
            navigation.navigate('DetailsScreen',{product:item});
            dispatch(ProductDetails(item));
          }}>
          <Text style={styles.viewDetailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal:10,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 3,
    padding: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 16,
  },
  productTitle: {
    fontSize: 18,
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
    fontSize: 16,
  },
  viewDetailsButton: {
    backgroundColor: '#3E64FF',
    padding: 12,
    marginTop: 16,
    borderRadius: 24,
  },
  viewDetailsButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProductItem;
