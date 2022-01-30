import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert, TouchableOpacity, Image, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import colors from '../config/colors';
import * as authActions from '../store/actions/auth';

function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async() => {
    try {
      await dispatch(authActions.signIn(email, password));
    } catch (err) {
      Alert.alert('An error occured', err.message, [{text: "Okay"}])
    }
  };

  return (
    <ImageBackground blurRadius={2} style={styles.background} source={require("../assets/background.png")}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={require("../assets/login.png")} />
      </View>

      <View style={styles.card}>
        <View style={styles.formControl} >
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.formControl} >
          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="default"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>

      <View style={styles.buttonsContainer}>  
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.text}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
  },
  iconContainer: {
    position: 'relative',
    top: 20
  },
  icon: {
    width: 400,
    height: 500,
    resizeMode: "contain"
  },
  card: {
    backgroundColor: colors.white,
    width: "80%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    padding: 20
  },
  formControl: {
    width: "100%"
  },
  label: {
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: colors.light,
    borderBottomWidth: 2
  },
  buttonsContainer: {
    padding: 20,
    width: "100%"
  },
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
    backgroundColor: colors.primary
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  }
})

export default LoginScreen;