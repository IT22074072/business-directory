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

          paddingLeft:20,
          paddingTop:20
        }}
      >
        #️Special for you
      </Text>

      <FlatList
        data={sliderList}
        horizontal={true}
        style={{paddingLeft:20}}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 310,
              height: 150,
              marginBottom: 10,
              borderRadius:15,
              marginRight:15
            }}
          />
        )}
      />
    </View>
  );
}
