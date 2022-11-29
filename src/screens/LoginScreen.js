import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  Image,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Zocial, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginScreen = () => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require("../../assets/background_login.png")}
        backgroundColor="black"
        resizeMode="cover"
        style={styles.backgroundimage}
      />

      <View style={styles.headerSection}>
        {/* Logo Section */}
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo.png")}
          ></Image>

          {/* Title Section */}
          <Text style={[styles.title, styles.shadow]}>Bathroom Break</Text>
        </View>
      </View>

      <View style={styles.inputSection}>
        {/* Inputs Section */}
        <View style={styles.inputRow}>
          {/* Login Row */}
          <SimpleLineIcons name="user" size={24} style={styles.icon} />
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="white"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        {/* Password Row */}
        <View style={styles.inputRow}>
          <SimpleLineIcons name="lock" size={24} style={styles.icon} />
          <TextInput
            style={styles.textInput}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="white"
            keyboardType="visible-password"
            secureTextEntry={true}
          />
        </View>
        {/* <TouchableOpacity> */}
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </TouchableOpacity>
        {/* </TouchableOpacity> */}
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>
        <View style={styles.socialSignIn}>
          <TouchableOpacity style={styles.signInFacebookButton}>
            <Zocial
              style={styles.signInFacebookIcon}
              name="facebook"
              size={16}
            />
            <Text style={styles.signInFacebookText}>Sign in with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signInGoogleButton}>
            <Zocial
              style={styles.signInGoogleIcon}
              name="googleplus"
              size={16}
            />
            <Text style={styles.signInGoogleText}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.createAccount}>
          <Text style={styles.createAccountText}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.createAccountButton}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
  backgroundimage: {
    ...StyleSheet.absoluteFillObject,
  },
  icon: {
    flex: 1,
    opacity: 0.8,
    color: "white",
  },
  shadow: {
    shadowOffset: {
      width: -5,
      height: -5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  logo: {
    opacity: 0.9,
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerSection: {
    flex: 4,
    justifyContent: "flex-end",
  },
  header: { alignItems: "center" },
  title: {
    alignContent: "center",
    color: "white",
    margin: 5,
    fontStyle: "serif",
    ...Platform.select({
      ios: { fontFamily: "Times New Roman", fontSize: 52 },
      android: { fontFamily: "serif", fontSize: 40 },
    }),
  },
  pindrop: {
    textAlign: "center",
  },
  inputSection: {
    flex: 3,
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    opacity: 0.7,
    marginHorizontal: 10,
  },
  textInput: {
    color: "white",
    height: 40,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    flex: 9,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    color: "white",
    marginTop: 5,
    marginRight: 20,
  },
  forgotPasswordText: {
    color: "#fff",
  },
  buttonSection: {
    flex: 3,
    justifyContent: "flex-start",
  },
  signInButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#146464",
    padding: 15,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    borderRadius: 20,
  },
  socialSignIn: {
    alignSelf: "center",
    justifyContent: "flex-start",
    flex: 1,
    marginBottom: 10,
  },
  signInFacebookButton: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#3b5998",
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  signInGoogleButton: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#dd4b39",
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
  },
  signInText: {
    color: "white",
  },
  signInFacebookIcon: {
    color: "white",
    width: 30,
  },
  signInFacebookText: {
    color: "white",
  },
  signInGoogleIcon: {
    color: "white",
    width: 30,
  },
  signInGoogleText: {
    color: "white",
  },
  createAccount: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    flex: 1,
  },
  createAccountText: {
    opacity: 0.8,
    color: "#fff",
    margin: 5,
  },
  createAccountButton: {
    opacity: 0.8,
    color: "#fff",
    margin: 5,
    fontWeight: "bold",
  },
});

export default LoginScreen;
