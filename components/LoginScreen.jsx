import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export default function LoginScreen() {
  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 90,
        }}
      >
        <Image
          source={require("./../assets/images/login.png")}
          style={{
            width: 200,
            height: 400,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "#000",

          }}
        />
      </View>

      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Your Ultimate
          <Text
            style={{
              color: Colors.PRIMARY,
            }}
          >
            {" "}
            {""}
            Community Business Directory
          </Text>{" "}
          {""}
          App
        </Text>

        <Text
          style={{
            fontSize: 15,
            fontFamily: "outfit",
            textAlign: "center",
            marginVertical: 15,
            color: Colors.GRAY,
          }}
        >
          Find your favorite business near you and post your own business to
          your community
        </Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={{ textAlign: "center", color:'#fff', fontFamily:'outfit'}}>Let's Get Started</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 120,
    marginTop: 15,
    
    
  },
});
