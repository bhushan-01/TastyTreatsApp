import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DetailsAPI } from '../../RestApi/ApiConfig';
import { View, StyleSheet, Text, FlatList, SafeAreaView, TextInput } from 'react-native';
import ProductItem from './ProductItem';
import Loadercomponent from '../../components/Loadercomponent/Loadercomponent';

const MainScreen = ({ navigation }) => {
  const [details, setDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]); // State for filtered products
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState(''); // State for search input text

  useEffect(() => {
    Products();
  }, []);

  useEffect(() => {
    // Filter products when searchText changes
    filterProducts();
  }, [searchText, details]);

  const Products = () => {
    setIsLoading(true);
    axios({
      method: 'get',
      url: DetailsAPI,
    })
      .then((response) => {
        setIsLoading(false);
        if (response?.status === 200) {
          setDetails(response?.data?.products);
          
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error, 'this is the error');
      });
  };

  // Function to filter products based on searchText
  const filterProducts = () => {
    const filteredProducts = details.filter((product) => {
      return product.title.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredDetails(filteredProducts);
  };

  const renderItem = ({ item }) => <ProductItem item={item} />;

  return (
    <SafeAreaView style={styles.container}>
     
      <Text style={styles.heading}>Main Screen</Text>
       <TextInput
        style={styles.searchInput}
        placeholder="Search by title"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <FlatList
        data={filteredDetails} // Use the filtered products list
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <Loadercomponent Visible={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16,
    backgroundColor: '#3E64FF',
    color: 'white',
  },
  searchInput: {
    padding: 8,
    margin: 8,
    borderWidth: 1,
    borderColor: '#3E64FF',
    borderRadius: 8,
  },
});

export default MainScreen;
