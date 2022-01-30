import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';

function PostButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>  
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle" 
          size={45} 
          color={colors.white} 
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    height: 70,
    width: 70,
    borderRadius: 35,
    bottom: 20,
  }
})

export default PostButton;