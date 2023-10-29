import React,{useEffect, useState} from 'react';
import { View, Text, Image, FlatList, StyleSheet ,TouchableOpacity,TextInput,  Modal,
  Pressable,
  Switch,} from 'react-native';
import { IMAGEPATH } from '../assets/Images/Imagepath';
import RBSheet from 'react-native-raw-bottom-sheet'; 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const dummyRecipes = [
  {
    id: 1,
    name: "Veggie Delight Pizza",
    description: "A delicious vegetarian pizza with assorted veggies.",
    image: IMAGEPATH.Foodone,
    price: 12.99,
    veg: true, // Indicates it's a vegetarian dish
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    description: "Classic pepperoni pizza with extra cheese and tomato sauce.",
    image: IMAGEPATH.Foodtwo,
    price: 14.99,
    veg: false, // Indicates it's not vegetarian
  },
  {
    id: 3,
    name: "Spaghetti Carbonara",
    description: "Creamy pasta with bacon, eggs, and parmesan cheese.",
    image: IMAGEPATH.Foodthree,
    price: 9.99,
    veg: false,
  },
  {
    id: 4,
    name: "Margherita Pizza",
    description: "Simple and tasty pizza with fresh tomatoes and mozzarella cheese.",
    image: IMAGEPATH.Foodthree,
    price: 11.99,
    veg: true,
  },
  {
    id: 5,
    name: "Veggie Sushi Rolls",
    description: "Sushi rolls with a variety of fresh vegetables and rice.",
    image: IMAGEPATH.Foodtwo,
    price: 10.99,
    veg: true,
  },
  {
    id: 6,
    name: "Chicken Tikka Masala",
    description: "Spicy Indian chicken dish in a creamy tomato-based sauce.",
    image: IMAGEPATH.Foodthree,
    price: 13.99,
    veg: false,
  },
  // Add more recipe data here
];

const Home = ({props}) => {
  useEffect(() => {
    filterAndSortRecipes();
  }, [searchText, sortOption, showVeg, showNonVeg]);
  const bottomSheetRef = React.createRef();
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(dummyRecipes);
  const [sortOption, setSortOption] = useState('none'); // 'none', 'priceAsc', 'priceDesc'
  const [showVeg, setShowVeg] = useState(true);
  const [showNonVeg, setShowNonVeg] = useState(true);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  

  const filterAndSortRecipes = () => {
    let filtered = dummyRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchText.toLowerCase())
    );
  
    if (showVeg && !showNonVeg) {
      filtered = filtered.filter((recipe) => recipe.veg);
    } else if (!showVeg && showNonVeg) {
      filtered = filtered.filter((recipe) => !recipe.veg);
    }
  
    if (sortOption === 'priceAsc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDesc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }
  
    setFilteredRecipes(filtered); // Update the filteredRecipes state, not dummyRecipes
  };

  const addToCart = (item) => {
    const itemInCartIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (itemInCartIndex > -1) {
      // If the item already exists, increment quantity
      const updatedCart = [...cart];
      updatedCart[itemInCartIndex].quantity += 1;
      setCart(updatedCart);
      setMessage(`Added ${item.name} to the cart`);
    } else {
      // If the item is not in the cart, add it with quantity 1
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart);
      setMessage(`Added ${item.name} to the cart`);
    }
  };

  const incrementQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        cartItem.quantity += 1; // Increment quantity
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  const decrementQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1; // Decrement quantity
        }
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
  const toggleFilterModal = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open(); // Open the RBSheet
    }
  };
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.screenName}>Recipes</Text>
        <TouchableOpacity style={styles.filterIcon} onPress={toggleFilterModal}>
          <FontAwesome5 name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search by name..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      {/* Filter modal */}
      <RBSheet
  ref={bottomSheetRef}
  closeOnDragDown={true}
  closeOnPressMask={true}
  height={500}
  customStyles={{
    wrapper: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  }}
>
  <View style={styles.filterModal}>
    <Text style={styles.filterTitle}>Filter Options</Text>
    <View style={styles.filterSection}>
      <Text style={styles.filterSectionTitle}>Veg/Non-Veg</Text>
      <View style={styles.filterSwitch}>
        <Text>Veg</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={showVeg ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setShowVeg(!showVeg)}
          value={showVeg}
        />
        <Text>Non-Veg</Text>
      </View>
    </View>
    {/* Add sorting options here */}
    <View style={styles.filterSection}>
      <Text style={styles.filterSectionTitle}>Sort by Price</Text>
      <TouchableOpacity
        style={[
          styles.sortButton,
          sortOption === 'priceAsc' ? styles.activeSortButton : null,
        ]}
        onPress={() => setSortOption('priceAsc')}
      >
        <Text style={styles.sortButtonText}>Low to High</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.sortButton,
          sortOption === 'priceDesc' ? styles.activeSortButton : null,
        ]}
        onPress={() => setSortOption('priceDesc')}
      >
        <Text style={styles.sortButtonText}>High to Low</Text>
      </TouchableOpacity>
    </View>
    <Pressable style={styles.filterCloseButton} onPress={() => bottomSheetRef.current.close()}>
      <Text style={styles.filterCloseButtonText}>Close</Text>
    </Pressable>
  </View>
</RBSheet>


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
              <Text style={styles.recipePrice}>Price: ${item.price.toFixed(2)}</Text>
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
          onPress={() => navigation.navigate('Cart', { cart })}
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
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: 'lightgray',
    padding: 8,
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
    marginLeft:10,
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