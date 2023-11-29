// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions/productActions';
import ImagePicker from 'react-native-image-picker';
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

  // Function to handle the button press
  const handleTaskButtonPress = () => {
    // Open image picker
    ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        // Upload the selected image
        uploadImage(response.uri);
      }
    });
  };

  // Function to upload the image to the API
  const uploadImage = async (uri) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'image/jpeg', // Adjust the type based on the image type
        name: 'image.jpg',
      });

      const response = await axios.post(
        'https://upload.imagekit.io/api/v1/files/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Add any other headers as needed
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
        data={products.products.products} // Accessing the nested products array
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
