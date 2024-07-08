import { View, Text, Image, Button, TouchableOpacity} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import {useWarmUpBrowser} from './../hooks/useWarmUpBrowser '
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking"




WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({ redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" })});

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);


  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 75,
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

        <TouchableOpacity style={styles.btn} onPress={onPress}>
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
