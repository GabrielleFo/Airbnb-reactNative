import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("email=>", email);
  console.log("password=>", password);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        setToken(response.data.token);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.logoView}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.textLogo}>Sign In</Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />

            <TextInput
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            {/* <Button
              title="Sign in"
              // onPress={async () => {
              //   const userToken = "secret-token";
              //   setToken(userToken);

              // }}
              onPress={fetchData}
            /> */}

            <TouchableOpacity
              onPress={fetchData}
              style={styles.touchableOpacity}
            >
              <Text>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: 20,
  },
  logoView: {
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    height: 100,
    width: 100,
  },
  textLogo: {
    marginTop: 10,
    fontSize: 20,
    textTransform: "uppercase",
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "rgb(231, 32, 77)",
    width: 300,
    margin: 20,
    height: 20,
  },
  touchableOpacity: {
    borderWidth: 3,
    borderColor: "rgb(231, 32, 77)",
    width: 200,
    margin: 20,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
  },
});
