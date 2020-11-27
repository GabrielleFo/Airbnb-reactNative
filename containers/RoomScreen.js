import React from "react";

import { Text, View } from "react-native";

export default function RoomScreen({ route }) {
  console.log(route);
  return (
    <View>
      <Text>ROOM id : {route.params.id}</Text>
    </View>
  );
}
