import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DetailsAPI } from '../../RestApi/ApiConfig';
import { View, StyleSheet, Text, FlatList, SafeAreaView, TextInput } from 'react-native';
import ProductItem from './ProductItem';
import Loadercomponent from '../../components/Loadercomponent/Loadercomponent';

const MainScreen = ({ navigation }) => {
  const [details, setDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState(''); 
  const [currentIndex,setCurrentIndex] = useState(1)
  useEffect(() => {
    Products(currentIndex);
  }, []);

  useEffect(() => {

    filterProducts();
  }, [searchText, details]);

  const Products = (currentIndex) => {
    setIsLoading(true);
    const skip = (currentIndex - 1) * 10;

    axios({
      method: 'get',
      url: DetailsAPI+`?skip=${skip}&limit=${10}`, 
    })
      .then((response) => {

        setIsLoading(false);
        if (response?.status === 200) {
          if(response.data.products.length>0){
            if(currentIndex==1){
              setDetails(response.data.products)
            }else{
              setDetails([...details,...response?.data?.products]);
            }
            setCurrentIndex(currentIndex)
          }
          
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error, 'this is the error');
      });
  };

  
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
        data={filteredDetails} 
        keyExtractor={(item,index) => `${index}+product-item`}
        renderItem={renderItem}
        onEndReachedThreshold={0.8}
        onEndReached={()=>{
          console.log("sdfddf")
          if(searchText.length==0){

            Products(currentIndex+1)
          }
        }
        }
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
