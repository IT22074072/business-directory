import { View, Text } from "react-native";
import React from "react";
import Headerr from "../../components/Home/headerr";
import Slider from "../../components/Home/Slider";
import Category from "../../components/Home/Category";


export default function home() {
  return (
    <View>
      {/*Header*/}
      <Headerr/>

      {/*Slider*/}
      <Slider/>

      {/*Categoery*/}
      <Category/>

      {/*Popular Business List*/}
    </View>
  );
}
