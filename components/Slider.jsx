import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "./../configs/FirebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    GetSliderList();
  }, []); //only once the component get load

  const GetSliderList = async () => {
    setSliderList([]);
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setSliderList((prev) => [...prev, doc.data()]);
    });
  };
  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          padding: 20,
        }}
      >
        Special for you
      </Text>

      <FlatList
        data={sliderList}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 300,
              height: 160,
              marginBottom: 10,
            }}
          />
        )}
      />
    </View>
  );
}
