import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function Intro({ business }) {
  const router = useRouter();
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 12,
          paddingTop: 35,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={26} color="black" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={26} color="black" />
      </View>
      <Image
        source={{ uri: business.imageUrl }}
        style={{ width: "100%", height: 260 }}
      />

      <View style={{padding:20, marginTop:-20, backgroundColor:'#fff', borderTopLeftRadius:25, borderTopRightRadius:25}}>
        <Text style={{fontSize:17, fontFamily:'outfit-bold'}}>{business.name}</Text>
        <Text style={{fontSize:14, fontFamily:'outfit', color:Colors.GRAY}}>{business.address}</Text>
      </View>
    </View>
  );
}
