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

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {IMAGEPATH} from '../../assets/Images/Imagepath';
import {useDispatch} from 'react-redux';
import {CartDetails} from '../../Store/CounterSlice';


import ModalSelector from 'react-native-modal-selector';

const imageMapping = {
  1: IMAGEPATH.Foodone,
  2: IMAGEPATH.Foodtwo,
  3: IMAGEPATH.Foodthree,
  4: IMAGEPATH.Foodfour,
  
};
const dummyRecipes = [
  {
    id: 1,
    name: 'Veggie Delight Pizza',
    description: 'A delicious vegetarian pizza with assorted veggies.',
    image: imageMapping[1],
    price: 12.99,
    veg: true, 
    category: 'veg',
  },
  {
    id: 2,
    name: 'Chicken Pepperoni Pizza',
    description: 'Classic pepperoni pizza with extra cheese and tomato sauce.',
    image: imageMapping[3],
    price: 14.99,
    veg: false, 
    category: 'non-veg',
  },
  {
    id: 3,
    name: 'Prawns Spaghetti Carbonara',
    description: 'Creamy pasta with bacon, eggs, and parmesan cheese.',
    image: imageMapping[1],
    price: 9.99,
    veg: false,
    category: 'veg',
  },
  {
    id: 4,
    name: 'Margherita Pizza',
    description:
      'Simple and tasty pizza with fresh tomatoes and mozzarella cheese.',
    image: imageMapping[2],
    price: 11.99,
    veg: true,
    category: 'non-veg',
  },
  {
    id: 5,
    name: 'Veggie Sushi Rolls',
    description: 'Sushi rolls with a variety of fresh vegetables and rice.',
    image: imageMapping[3],
    price: 10.99,
    veg: true,
    category: 'veg',
  },
  {
    id: 6,
    name: 'Chicken Tikka Masala',
    description: 'Spicy Indian chicken dish in a creamy tomato-based sauce.',
    image: imageMapping[4],
    price: 13.99,
    veg: false,
    category: 'non-veg',
  },
];

const Home = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  const [SearchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('both');
  const [filteredRecipes, setFilteredRecipes] = useState(dummyRecipes);
  const [sortOrder, setSortOrder] = useState('asc');
  const dispatch = useDispatch();

  const onFilterChange = (value) => {
    setFilter(value);
    const filterRecipes = (recipe) => (value === 'both' || (value === 'veg' && recipe.veg) || (value === 'non-veg' && !recipe.veg));
    setFilteredRecipes(dummyRecipes.filter(filterRecipes));
  };

  const sortRecipes = () => {
    const sortedRecipes = [...filteredRecipes];
    sortedRecipes.sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));
    setFilteredRecipes(sortedRecipes);
  };

  useEffect(() => {
    sortRecipes();
  }, [sortOrder]);

  const addToCart = (item) => {
    const cartItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
    const updatedCart = cartItemIndex > -1 ? cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)) : [...cart, { ...item, quantity: 1 }];
    setCart(updatedCart);
  
  };

  const updateQuantity = (item, increment) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        const newQuantity = increment ? cartItem.quantity + 1 : cartItem.quantity - 1;
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  const removeItem = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenName}>Recipes</Text>
        <ModalSelector
          data={[
            { key: 0, label: 'Both' },
            { key: 1, label: 'Veg' },
            { key: 2, label: 'Non-Veg' },
          ]}
          initValue="Select Filter"
          onChange={(option) => {
            onFilterChange(option.key === 0 ? 'both' : option.key === 1 ? 'veg' : 'non-veg');
          }}
        />
        <TouchableOpacity
          style={styles.filterIcon}
          onPress={() => bottomSheetRef.current.open()}
        >
          <FontAwesome5 name="filter" size={24} color="#007acc" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name..."
        value={SearchText}
        onChangeText={(text) => {
          setSearchText(text);
          const filtered = dummyRecipes.filter((recipe) =>
            recipe.name.toLowerCase().includes(text.toLowerCase())
          );
          setFilteredRecipes(filtered);
        }}
      />
      <Text style={{ marginLeft: 13 }}>Sort by prices:</Text>
      <View style={styles.sortButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortOrder === 'asc' && styles.activeSortButton,
          ]}
          onPress={() => setSortOrder('asc')}
        >
          <Text style={[styles.sortButtonText, sortOrder === 'asc' && styles.activeSortButtonText]}>
            Low to High
        </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortOrder === 'desc' && styles.activeSortButton,
          ]}
          onPress={() => setSortOrder('desc')}
        >
          <Text style={[styles.sortButtonText, sortOrder === 'desc' && styles.activeSortButtonText]}>
            High to Low
          </Text>
        </TouchableOpacity>
      </View>
      
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
                      onPress={() => updateQuantity(item, false)}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item, true)}
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
          onPress={() => {
            navigation.navigate('Cart', { cart });
            dispatch(CartDetails(cart));
          }}
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
    width:"100%",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#007acc',
  },
  screenName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight:"41%"
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
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    margin: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  sortButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  sortButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#007acc',
    borderRadius: 8,
    margin: 4,
  },
  activeSortButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    margin: 4,
  },
  activeSortButtonText: {
    color: '#fff',
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
    marginHorizontal: 8,
    paddingHorizontal: 10,
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
