import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import colors from '../config/colors';

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground blurRadius={2} style={styles.background} source={require("../assets/background.png")}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/splash.png")} />
      </View>

      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={require("../assets/welcome.png")} />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[ styles.button, {backgroundColor: colors.primary} ]} 
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.text}>Sign In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[ styles.button, {backgroundColor: colors.secondary} ]} 
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.text}>Sign Up</Text>
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
  logoContainer: {
    position: 'absolute',
    top: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  logo : {
    width: 300,
    height: 100,
  }, 
  iconContainer: {
    position: 'relative',
    top: 50
  },
  icon: {
    width: 500,
    height: 600,
    resizeMode: "contain"
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
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  }
})

export default WelcomeScreen;