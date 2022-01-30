import React, {useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { db } from "../config/firebase";
import Post from '../components/Post';

function HomeScreen() {
  const user = useSelector(state => state.auth.name);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })                
  }, []);

  return (
      <View style={styles.screen}>
        <FlatList 
          data={posts}
          renderItem={({ item }) => 
            <Post postId={item.id} post={item.post} user={user} />
          }
        />
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
});

export default HomeScreen;