import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import * as firebase from 'firebase';
import { config, db } from '../config/firebase';
import colors from '../config/colors';

function PostImageScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(state => state.auth.name);

  const upload = async (uri) => {
    if(!firebase.apps.length) {
      firebase.initializeApp(config);
    } 

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const ref = firebase.storage().ref("images").child(new Date().toISOString());
    const snapshot = await ref.put(blob);
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
  }

  const makePost = async () => {
    setIsLoading(true);
    const url = await upload(image);
    setIsLoading(false);

    db.collection("posts").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      caption: caption,
      imageUrl: url,
      username: user
    });

    navigation.navigate("Home");
  }
  
  const takeImageHandler = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          "Error",
          "This feature requires permissions for Gallery."
          [{ text: "Okay" }]
        );
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.caption}>
          <TextInput 
            style={styles.input} 
            placeholder="Enter your caption here"  
            multiline
            value={caption}
            onChangeText={(text) => setCaption(text)}
          />
        </View>

        <TouchableWithoutFeedback style={styles.imageInput} onPress={takeImageHandler}>
          <View style={styles.imageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.imgtext}>Tap to Select an image</Text>
            )}
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.buttonsContainer}>  
          <TouchableOpacity style={styles.button} onPress={makePost}>
            <Text style={styles.text}>Ready to post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 90
  },
  caption: {
    width: "100%",
    minHeight: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.grey,
    marginBottom: 25,
    padding: 15,
  },
  input: {
    fontSize: 18,
  },
  imageInput: {
    width: "100%"
  },
  imageContainer: {
    width: "100%",
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.grey,
    borderWidth: 2,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15
  },
  image: {
    width: "100%",
    height: "100%"
  },
  imgtext: {
    fontSize: 18, 
    color: colors.black
  },
  buttonsContainer: {
    padding: 15,
    marginBottom: 10,
    width: "100%"
  },
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    backgroundColor: colors.primary
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default PostImageScreen;