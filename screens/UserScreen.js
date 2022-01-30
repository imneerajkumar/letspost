import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../store/actions/auth';
import colors from '../config/colors';

function UserScreen(props) {
  const username = useSelector(state => state.auth.name);
  const email = useSelector(state => state.auth.email);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(authActions.logout());
    } catch (err) {
      Alert.alert('An error occured', err.message, [{text: "Okay"}])
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Avatar.Image style={{backgroundColor: colors.primary}} size={75} source={require("../assets/user.png")} />
        <View style={styles.user}>
          <Text style={styles.name}>{username}</Text>
        </View>
      </View>

      <View style={styles.items}>
        <View style={[styles.icon, {backgroundColor: colors.secondary}]}>
          <MaterialCommunityIcons name="email" size={25} color={colors.white} />
        </View>
        <Text>{email}</Text>
      </View>

      <TouchableOpacity style={styles.items} onPress={handleLogout}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="logout" size={25} color={colors.white}/>
        </View>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    backgroundColor: colors.light,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 150,
    paddingTop: 40,
    paddingHorizontal: 15,
    marginBottom: 30
  },
  user: {
    marginLeft: 15,
  },
  name: {
    fontSize: 28
  },
  items: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.light,
    width: "100%",
    padding: 10,
    marginBottom: 15
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  }
})

export default UserScreen;
