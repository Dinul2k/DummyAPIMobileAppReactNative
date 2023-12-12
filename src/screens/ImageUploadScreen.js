// screens/ImageUploadScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const ImageUploadScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      if (image) {
        // You can add the logic to upload the image to your server here

        // Display the uploaded image
        setSelectedImage(image.path);
      }
    } catch (error) {
      console.error('ImagePicker Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Hello World! This is an image upload screen.</Text>

      {/* Button to pick and upload image */}
      <Button title="Upload Image" onPress={handleImageUpload} />

      {/* Display the uploaded image */}
      {selectedImage && (
        <View style={styles.uploadedImageContainer}>
          <Text>Uploaded Image:</Text>
          <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default ImageUploadScreen;
