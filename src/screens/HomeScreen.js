import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productActions';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(fetchProducts());
  }, [dispatch]);

  // Log the products to check if data is coming
  useEffect(() => {
    console.log('Received products:', products);
  }, [products]);

  const handleUploadImagePress = () => {
    // Navigate to a new blank page (you can replace 'BlankPage' with the actual name of your new page)
    navigation.navigate('ImageUploadScreen');
  };

  return (
    <View style={styles.container}>
      {/* Upload Image button at the top */}
      <Button title="Upload Image" onPress={handleUploadImagePress} />

      {/* FlatList to display products */}
      <FlatList
        data={products.products.products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Price: ${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productContainer: {
    marginBottom: 16,
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
});

export default HomeScreen;
