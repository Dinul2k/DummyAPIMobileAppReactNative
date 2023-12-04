import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productActions';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(fetchProducts());
  }, [dispatch]);

  // Log the products to check if data is coming
  useEffect(() => {
    console.log('Received products:', products);
  }, [products]);

  // Function to handle the button press using react-native-image-crop-picker
  const handleTaskButtonPress = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      if (image) {
        // Upload the selected image
        uploadImage(image.path);
      }
    } catch (error) {
      console.error('ImagePicker Error:', error);
    }
  };

  // Function to upload the image to the API
  const uploadImage = async (path) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: path,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const response = await axios.post(
        'https://ik.imagekit.io/78dcqstv9/v1/files/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Display the uploaded image
      setSelectedImage(response.data.url);
    } catch (error) {
      console.error('Image Upload Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Button to perform the task */}
      <Button title="Upload Image and Show" onPress={handleTaskButtonPress} />

      {/* Display the uploaded image */}
      {selectedImage && (
        <View style={styles.uploadedImageContainer}>
          <Text>Uploaded Image:</Text>
          <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
        </View>
      )}

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
  uploadedImageContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  uploadedImage: {
    width: 200,
    height: 200,
    marginTop: 8,
  },
});

export default HomeScreen;
