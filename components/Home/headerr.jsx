import { View, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Headerr() {
    const { user } = useUser();
    return (
      <View
        style={{
          padding: 20,
          paddingTop: 40,
        }}
      >
        <View>
          <Image
            source={{ uri: user?.imageUrl }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 99,
            }}
          />
        </View>
      </View>
    );
}