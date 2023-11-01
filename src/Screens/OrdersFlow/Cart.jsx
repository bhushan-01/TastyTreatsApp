import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { IMAGEPATH } from '../../assets/Images/Imagepath';
import { useSelector } from 'react-redux';

const Cart = ({ route }) => {
  const CartItems = useSelector((state) => state?.newAuth?.CartDetails);

  const imageMapping = {
    1: IMAGEPATH.Foodone,
    2: IMAGEPATH.Foodtwo,
    3: IMAGEPATH.Foodthree,
    4: IMAGEPATH.Foodfour,
  };

  const renderEmptyCartMessage = () => (
    <Text style={styles.emptyCartMessage}>No items in the cart</Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenName}>Cart</Text>
      <FlatList
        data={CartItems}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={imageMapping[item.image]} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>Price: ${item.price.toFixed(2)}</Text>
              <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={renderEmptyCartMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  screenName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyCartMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },
  cartItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
    color: '#888',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 16,
    color: '#888',
  },
});

export default Cart;
