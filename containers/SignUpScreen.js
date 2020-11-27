import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";

export default function SignUpScreen({ setToken }) {
  //console.log("coucou");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [valPassword, setValPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const fetchData = async () => {
    //vérification que tous les champs sont bien remplis
    if (email && username && description && password && valPassword) {
      console.log("on passe à la suite");
      if (password === valPassword) {
        console.log("on passe à la suite 2");

        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          console.log(response.data);
          if (response.data.token) {
            setToken(response.data.token);
          } else {
            alert("une erreur est survenue");
          }
        } catch (error) {
          setErrorMessage(error.response.data.error);
        }
      } else {
        setErrorMessage("Les mots de passe ne sont pas identiques");
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs");
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
          <Text style={styles.textLogo}>Sign up</Text>
        </View>
        <View>
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
              placeholder="Username"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
              }}
            />

            <TextInput
              style={styles.textInputDescription}
              placeholder="Description"
              multiline={true}
              numberOfLines={10}
              maxLength={200}
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              textContentType="oneTimeCode"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <TextInput
              style={styles.textInput}
              textContentType="oneTimeCode" // pour iphone et le message de mdp
              placeholder="confirmation password"
              secureTextEntry={true}
              value={valPassword}
              onChangeText={(text) => {
                setValPassword(text);
              }}
            />
            <View style={styles.logoView}>
              <TouchableHighlight
                onPress={fetchData}
                style={styles.touchableHightLight}
              >
                <View>
                  <Text style={styles.textButton}>Sign up</Text>
                </View>
              </TouchableHighlight>
            </View>
            {/* <Button
              title="Sign up"
              onPress={async () => {
                const userToken = "secret-token";
                setToken(userToken);
              }}
            /> */}

            <TouchableHighlight
              onPress={() => {
                console.log("coucou2");
              }}
            >
              <View>
                <Text>Already have an acount? Sign in</Text>
              </View>
            </TouchableHighlight>

            <View style={styles.errorView}>
              <Text style={styles.error}>{errorMessage}</Text>
            </View>
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
  textInputDescription: {
    borderWidth: 1,
    borderColor: "rgb(231, 32, 77)",
    width: 300,
    margin: 20,
    height: 80,
  },
  touchableHightLight: {
    borderWidth: 3,
    borderColor: "rgb(231, 32, 77)",
    width: 200,
    margin: 20,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
  },
  textButton: {
    textAlign: "center",
    fontSize: 28,
  },
  errorView: {
    height: 30,
    backgroundColor: "red",
    width: 300,
    marginTop: 20,
  },
  error: {
    fontSize: 20,
    color: "white",
  },
});
