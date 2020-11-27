import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Image,
  touchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import axios from "axios";
import { TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://express-airbnb-api.herokuapp.com/rooms"
    );
    console.log(response.data);

    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      {isLoading === true ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          renderItem={(obj) => {
            //création du tableau pour les étoiles
            const stars = [];
            for (let i = 1; i <= 5; i++) {
              if (obj.item.ratingValue >= i) {
                stars.push(
                  <AntDesign name="star" size={24} color="gold" key={i} />
                );
              } else {
                stars.push(
                  <AntDesign name="star" size={24} color="grey" key={i} />
                );
              }
            }

            return (
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => {
                  navigation.navigate("Room", {
                    id: obj.item._id,
                  });
                }}
              >
                <View style={styles.container}>
                  <ImageBackground
                    source={{ uri: obj.item.photos[0].url }}
                    style={{
                      height: 200,
                      width: Dimensions.get("window").width,
                    }}
                  >
                    <View style={styles.containerPrice}>
                      <Text style={styles.price}>{obj.item.price}€</Text>
                    </View>
                  </ImageBackground>

                  <Text style={styles.title}>{obj.item.title}</Text>
                  <View style={styles.details}>
                    <Text>
                      {stars}
                      {/* <AntDesign name="star" size={24} color="black" />
                    <AntDesign name="star" size={24} color="black" />
                    <AntDesign name="star" size={24} color="black" /> */}
                      {obj.item.reviews} Reviews
                    </Text>
                    <Image
                      source={{ uri: obj.item.user.account.photo.url }}
                      style={styles.avatar}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => {
            return item._id;
          }}
        />
      )}

      {/* <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  touchableOpacity: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  container: {
    marginTop: 30,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  containerPrice: {
    height: 40,
    width: 80,
    //effet de transparence uniquement sur le container
    backgroundColor: "rgba(0,0,0,0.5)",
    //backgroundColor: "black",
    //effet de transparence sur tout le prix (fond et caractere)
    //opacity: 0.7,
    justifyContent: "center", // alignement vertical
    alignItems: "center", //alignement horizontal
    //pour afficher le prix en bas
    position: "absolute",
    bottom: 20,
  },
  price: {
    color: "white",
    fontSize: 30,
  },
  title: {
    fontSize: 20,
  },
});
