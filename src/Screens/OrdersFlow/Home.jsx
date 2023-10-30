import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Switch,
} from 'react-native';
import { CheckBox } from 'react-native-elements';   
import RBSheet from 'react-native-raw-bottom-sheet';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {IMAGEPATH} from '../../assets/Images/Imagepath';
import { useDispatch } from 'react-redux';
import { CartItems } from '../../Store/CounterSlice';
import ModalDropdown from 'react-native-modal-dropdown';

import ModalSelector from 'react-native-modal-selector';

const imageMapping = {
  1: IMAGEPATH.Foodone,
  2: IMAGEPATH.Foodtwo,
  3: IMAGEPATH.Foodthree,
  4: IMAGEPATH.Foodfour,
  // Add mappings for other image IDs here
};
const dummyRecipes = [
  {
    id: 1,
    name: 'Veggie Delight Pizza',
    description: 'A delicious vegetarian pizza with assorted veggies.',
    image: imageMapping[1],
    price: 12.99,
    veg: true, // Indicates it's a vegetarian dish
    category: 'veg'
  },
  {
    id: 2,
    name: 'Chicken Pepperoni Pizza',
    description: 'Classic pepperoni pizza with extra cheese and tomato sauce.',
    image:imageMapping[3],
    price: 14.99,
    veg: false, // Indicates it's not vegetarian
    category: 'non-veg'
  },
  {
    id: 3,
    name: 'Prawns Spaghetti Carbonara',
    description: 'Creamy pasta with bacon, eggs, and parmesan cheese.',
    image: imageMapping[1],
    price: 9.99,
    veg: false,
    category: 'veg'
  },
  {
    id: 4,
    name: 'Margherita Pizza',
    description:
      'Simple and tasty pizza with fresh tomatoes and mozzarella cheese.',
    image: imageMapping[2],
    price: 11.99,
    veg: true,
    category: 'non-veg'
  },
  {
    id: 5,
    name: 'Veggie Sushi Rolls',
    description: 'Sushi rolls with a variety of fresh vegetables and rice.',
    image:imageMapping[3],
    price: 10.99,
    veg: true,
    category: 'veg'
  },
  {
    id: 6,
    name: 'Chicken Tikka Masala',
    description: 'Spicy Indian chicken dish in a creamy tomato-based sauce.',
    image: imageMapping[4],
    price: 13.99,
    veg: false,
    category: 'non-veg'
  },

];

const Home = ({props,navigation}) => {
  const bottomSheetRef = React.createRef();
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
  const [SearchText, setSearchText] = useState()
  const [filter, setFilter] = useState('both');
  const [filteredRecipes, setFilteredRecipes] = useState(dummyRecipes);

  const onFilterChange = (value) => {
    setFilter(value);
    if (value === 'both') {
      setFilteredRecipes(dummyRecipes);
    } else if (value === 'veg') {
      const vegRecipes = dummyRecipes.filter((recipe) => recipe.veg);
      setFilteredRecipes(vegRecipes);
    } else if (value === 'non-veg') {
      const nonVegRecipes = dummyRecipes.filter((recipe) => !recipe.veg);
      setFilteredRecipes(nonVegRecipes);
    }
  };


const filterRecipes = (text) => {
  const filtered = dummyRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(text.toLowerCase())
  );
  setFilteredRecipes(filtered);
};


 
  const addToCart = item => {
    const itemInCartIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (itemInCartIndex > -1) {
     
      const updatedCart = [...cart];
      updatedCart[itemInCartIndex].quantity += 1;
      setCart(updatedCart);
      setMessage(`Added ${item.name} to the cart`);
      console.log('Cart after adding to cart:', updatedCart); 
    } else {
    
      const updatedCart = [...cart, {...item, quantity: 1}];
      setCart(updatedCart);
      setMessage(`Added ${item.name} to the cart`);
      console.log('Cart after adding to cart:', updatedCart); 
    }
  };

  const incrementQuantity = item => {
    const updatedCart = cart.map(cartItem => {
      if (cartItem.id === item.id) {
        cartItem.quantity += 1; 
      }
      return cartItem;
    });
    setCart(updatedCart);
    console.log('Cart after incrementing quantity:', updatedCart); 
  };

  const decrementQuantity = item => {
    const updatedCart = cart.map(cartItem => {
      if (cartItem.id === item.id) {
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1; 
        }
      }
      return cartItem;
    });
    setCart(updatedCart);
    console.log('Cart after decrementing quantity:', updatedCart);
  };

  const removeItem = item => {
    const updatedCart = cart.filter(cartItem => cartItem.id !== item.id);
    setCart(updatedCart);
    console.log('Cart after removing item:', updatedCart); 
  };
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );


 
 


  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.screenName}>Recipes</Text>
  
      <ModalSelector
  data={[
    { key: 0, label: 'Both' },
    { key: 1, label: 'Veg' },
    { key: 2, label: 'Non-Veg' }
  ]}
  initValue="Select Filter"
  onChange={(option) => {
    switch (option.key) {
      case 0:
        onFilterChange('both');
        break;
      case 1:
        onFilterChange('veg');
        break;
      case 2:
        onFilterChange('non-veg');
        break;
      default:
        break;
    }
  }}
/>

    </View>
     <TextInput
 style={styles.searchBar}
 placeholder="Search by name..."
 value={SearchText}
 onChangeText={(text) => {
   setSearchText(text);
   filterRecipes(text);
 }}
/>

  
    {message ? <Text style={styles.successMessage}>{message}</Text> : null}
    <FlatList
      showsVerticalScrollIndicator={false}
      data={filteredRecipes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const cartItem = cart.find((cartItem) => cartItem.id === item.id);
        const quantity = cartItem ? cartItem.quantity : 0;

        return (
          <View style={styles.recipeCard}>
            <Image source={item.image} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{item.name}</Text>
            <Text style={styles.recipeDescription}>{item.description}</Text>
            <Text style={styles.recipePrice}>
              Price: ${item.price.toFixed(2)}
            </Text>
            <View style={styles.cartActions}>
              {cartItem ? (
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => decrementQuantity(item)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => incrementQuantity(item)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.cartActionButton}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.cartActionButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(item)}
              >
                <Text style={styles.cartActionButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
    <View style={styles.cartTotalContainer}>
      <Text style={styles.cartTotal}>Cart Total: ${cartTotal.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.viewCartButton}
        onPress={() =>navigation.navigate('Cart', { cart })}
      >
        <View style={styles.viewCartButtonInner}>
          <Text style={styles.viewCartButtonText}>View Cart</Text>
          <FontAwesome5 name="arrow-right" size={20} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  </View>
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#007acc',
  },
  screenName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterIcon: {
    padding: 8,
    borderRadius: 8,
  },
  successMessage: {
    textAlign: 'center',
    color: 'green',
    fontSize: 16,
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 10,
    margin: 16,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filterModal: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#007acc',
    borderRadius: 8,
  },
  activeFilterButton: {
    backgroundColor: '#007acc',
    padding: 8,
    borderRadius: 8,
  },
  filterButtonText: {
    color: 'black',
  },
  sortButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#007acc',
    borderRadius: 8,
    margin: 4,
  },
  activeSortButton: {
    backgroundColor: '#007acc',
  },
  sortButtonText: {
    color: '#007acc',
    fontWeight: 'bold',
  },
  filterCloseButton: {
    backgroundColor: '#007acc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
  cartActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  quantityControls: {
    flexDirection: 'row',
   
  


  },
  quantityButton: {
    backgroundColor: 'lightgray',
    marginHorizontal:8,
    paddingHorizontal:10,
    
    borderRadius: 4,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartActionButton: {
    backgroundColor: '#007acc',
    padding: 8,
    borderRadius: 4,
  },
  cartActionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  cartTotalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  viewCartButton: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 4,
  },
  viewCartButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default Home;
