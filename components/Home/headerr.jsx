import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import { Ionicons } from '@expo/vector-icons';

export default function Headerr() {
  const { user } = useUser();
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 99,
          }}
        />

        <View>
          <Text style={{ color: "#fff" }}>Welcome, </Text>
          <Text
            style={{
              fontSize: 19,
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            {user?.fullName}
          </Text>
        </View>
      </View>


      {/*SearchBar*/}
      <View style={{display:'flex', flexDirection:'row', gap:20, alignItems:'center', backgroundColor:'#fff', padding: 8,marginVertical:10, marginTop:17, borderRadius:8}}>
      <Ionicons name="search-sharp" size={24} color={Colors.PRIMARY} />
      <TextInput placeholder="Search..." style={{fontFamily:'outfit', fontSize:16}}/>
      </View>
    </View>
  );
}
