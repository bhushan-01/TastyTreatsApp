import React,{useEffect, useState} from 'react';
import { View, Text, Image, FlatList, StyleSheet ,TouchableOpacity} from 'react-native';
import { IMAGEPATH } from '../assets/Images/Imagepath';

const dummyRecipes = [
  {
    id: 1,
    name: "Recipe 1",
    description: "This is the first recipe description.",
    image: IMAGEPATH.Foodone,
    price: 10.99,
  },
  {
    id: 2,
    name: "Recipe 2",
    description: "This is the second recipe description.",
   image: IMAGEPATH.Foodtwo,
   price: 10.99,
  },
  {
    id: 3,
    name: "Recipe 2",
    description: "This is the second recipe description.",
   image: IMAGEPATH.Foodthree,
   price: 10.99,
  },
  {
    id: 4,
    name: "Recipe 2",
    description: "This is the second recipe description.",
   image: IMAGEPATH.Foodone,
   price: 10.99,

  },
  {
    id: 5,
    name: "Recipe 2",
    description: "This is the second recipe description.",
    image: IMAGEPATH.Foodtwo,
    price: 10.99,
  },


];

const Home = ({props}) => {
  useEffect(() => {
 
  }, [])
  
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');

  const addToCart = (item) => {
    const itemInCartIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (itemInCartIndex > -1) {
      // If item already exists, increment quantity
      const updatedCart = [...cart];
      updatedCart[itemInCartIndex].quantity += 1;
      setCart(updatedCart);
      setMessage(`Added ${item.name} to the cart`);
    } else {
      // If item is not in the cart, add it with quantity 1
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart);
      setMessage(`Added ${item.name} to the cart`);
    }
  };

  const incrementQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  const decrementQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        const newQuantity = cartItem.quantity - 1;
        if (newQuantity > 0) {
          return { ...cartItem, quantity: newQuantity };
        }
        return null; // Remove the item if quantity is zero
      }
      return cartItem;
    }).filter((item) => item !== null); // Filter out removed items
    setCart(updatedCart);
  };

  const removeItem = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  console.log("Current Cart:", cart); // Display the current cart in the console

  return (
    <View style={styles.container}>
      {message ? <Text style={styles.successMessage}>{message}</Text> : null}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dummyRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recipeCard}>
            <Image source={item.image} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{item.name}</Text>
            <Text style={styles.recipeDescription}>{item.description}</Text>
            <Text style={styles.recipePrice}>Price: ${item.price.toFixed(2)}</Text>
            <View style={styles.cartActions}>
              <TouchableOpacity
                style={styles.cartActionButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.cartActionButtonText}>
                  {cart.find((cartItem) => cartItem.id === item.id)
                    ? 'Add More'
                    : 'Add to Cart'}
                </Text>
              </TouchableOpacity>
              {cart.find((cartItem) => cartItem.id === item.id) && (
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.incrementButton}
                    onPress={() => incrementQuantity(item)}
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.decrementButton}
                    onPress={() => decrementQuantity(item)}
                  >
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(item)}
              >
                <Text style={styles.cartActionButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Text style={styles.cartTotal}>Cart Total: ${cartTotal.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.viewCartButton}
        onPress={() => navigation.navigate('Cart', { cart })}
      >
        <Text style={styles.viewCartButtonText}>View Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 16,
},
recipeCard: {
  marginVertical: 16,
  padding: 16,
  backgroundColor: '#fff',
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
recipeImage: {
  width: '100%',
  height: 200,
  borderRadius: 8,
},
recipeName: {
  fontSize: 20,
  fontWeight: 'bold',
},
recipeDescription: {
  marginTop: 8,
  fontSize: 16,
},
recipePrice: {
  fontSize: 16,
  fontWeight: 'bold',
  marginTop: 8,
},
addToCartButton: {
  backgroundColor: 'green',
  padding: 8,
  borderRadius: 4,
  marginTop: 12,
},
addToCartButtonText: {
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',
},
viewCartButton: {
  backgroundColor: 'blue',
  padding: 16,
  borderRadius: 4,
  position: 'absolute',
  bottom: 16,
  left: 16,
  right: 16,
},
viewCartButtonText: {
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',
},
});

export default Home;