import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  FontAwesome,
} from "@expo/vector-icons";

const CreateAccountScreen = ({ navigation }) => {
  const [name, onChangeName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [confirmPassword, onChangeConfirmPassword] = React.useState("");
  const [isTermsSelected, setTermsSelection] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require("../../assets/background_create_account.png")}
        backgroundColor="black"
        resizeMode="cover"
        style={styles.backgroundimage}
      />
      {/* Title */}
      <View style={styles.headerSection}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Ionicons name="md-arrow-back" size={35} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>New Account</Text>
      </View>
      {/* Camera */}
      <View style={styles.cameraSection}>
        <TouchableOpacity style={styles.cameraContainer}>
          <SimpleLineIcons style={styles.camera} name="camera" />
        </TouchableOpacity>
      </View>

      {/* Inputs Section */}
      <View style={styles.inputSection}>
        <View style={styles.inputRow}>
          {/* Name Row */}
          <SimpleLineIcons name="user" size={24} style={styles.icon} />
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeName}
            value={name}
            placeholder="Name"
            placeholderTextColor="white"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputRow}>
          {/* Email Row */}
          <MaterialCommunityIcons
            name="email-outline"
            size={28}
            color="white"
            style={styles.icon}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="white"
            // keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputRow}>
          {/* Password Row */}
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
        <View style={styles.inputRow}>
          {/* Confirm Password Row */}
          <SimpleLineIcons name="lock" size={24} style={styles.icon} />
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor="white"
            keyboardType="visible-password"
            secureTextEntry={true}
          />
        </View>
      </View>
      {/* Create button */}
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>

        {/* Terms & Conditions */}
        <View style={styles.termsContainer}>
          <Checkbox
            value={isTermsSelected}
            onValueChange={setTermsSelection}
            style={styles.termsCheckbox}
          />
          <TouchableOpacity>
            <Text
              onPress={() => navigation.navigate("TermsAndConditions")}
              style={styles.termsText}
            >
              Terms & Conditions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "space-around",
    // alignItems: "center",
  },
  icon: {
    flex: 1,
    opacity: 0.8,
    color: "white",
  },
  backgroundimage: {
    ...StyleSheet.absoluteFillObject,
  },
  // 22%
  headerSection: {
    flex: 22,
    paddingLeft: 20,
    alignSelf: "flex-start",
    justifyContent: "flex-end",
  },
  // 23%
  cameraSection: {
    flex: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  // 35%
  inputSection: {
    flex: 35,
    marginLeft: 20,
    marginRight: 20,
  },
  // 18%
  buttonSection: {
    flex: 18,
  },
  termsSection: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cameraContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.085)",
    height: 130,
    width: 130,
    borderRadius: 65,
    justifyContent: "center",
  },
  camera: { alignSelf: "center", opacity: 0.7, fontSize: 44, color: "white" },
  title: {
    alignSelf: "flex-start",
    color: "white",
    marginLeft: 40,
    fontSize: 34,
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
  createButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#146464",
    padding: 20,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    borderRadius: 20,
  },
  createText: {
    color: "white",
  },
  termsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    color: "white",
  },
  termsCheckbox: {
    marginRight: 8,
  },
  termsText: {
    color: "#4289e0",
    fontSize: 16,
  },
});

export default CreateAccountScreen;
