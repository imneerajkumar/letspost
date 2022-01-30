import React, {useState, useEffect } from 'react';
import { Text, TextInput, View, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { Avatar } from 'react-native-paper';
import firebase from 'firebase';
import { db } from '../config/firebase';
import colors from '../config/colors';

function Post({ postId, post, user }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const makeComment = async () => {
      db.collection("posts").doc(postId).collection("comments").add({
        text: comment,
        username: user,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment("");
  }

  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <Avatar.Image size={40} style={{backgroundColor: colors.primary}} source={require("../assets/user.png")} />
        <Text style={styles.name}>{post.username}</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: post.imageUrl}} />
      </View>

      <View style={styles.caption}>
        <Text style={[styles.bold, {fontSize: 16}]}>{post.username}</Text> 
        <Text style={{fontSize: 16}}>{post.caption}</Text>
      </View>

      <FlatList 
        keyExtractor={(item) => item.timestamp}
        data={comments}
        renderItem={({ item }) =>
          <View style={styles.comments}>
            <Text style={styles.bold}>{item.username}</Text>
            <Text>{item.text}</Text>
          </View>
        }
      />
            
      <View style={styles.makecomment}>
        <TextInput 
          style={styles.input} 
          placeholder="Add comment" 
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity style={styles.icon} onPress={makeComment}>
          <MaterialCommunityIcons name="send" size={28} color={colors.primary}/>
        </TouchableOpacity> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    width: 350,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 20,
    marginBottom: 40,
    overflow: "hidden"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 60,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey
  },
  name: {
    marginLeft: 15,
    fontSize: 22
  },
  imageContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    overflow: "hidden"
  },
  image: {
    width: 400,
    height: 350,
    resizeMode: "cover",
  },
  caption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5
  },
  comments: {
    flexDirection: "row",
    marginBottom: 3
  },
  makecomment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomEndRadius: 15,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: colors.grey
  },
  input: {
    paddingLeft: 15
  },
  icon: {
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    borderBottomEndRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  bold: {
    fontWeight: "bold",
    marginLeft: 15,
    marginRight: 10
  }
})

export default Post;