import { View, Text, ScrollView } from "react-native";
import React from "react";
import Headerr from "../../components/Home/headerr";
import Slider from "../../components/Home/Slider";
import Category from "../../components/Home/Category";
import PopularBusiness from "../../components/Home/PopularBusiness";


export default function home() {
  return (
    <ScrollView>
      {/*Header*/}
      <Headerr/>

      {/*Slider*/}
      <Slider/>

      {/*Categoery*/}
      <Category/>

      {/*Popular Business List*/}
      <PopularBusiness/>

      <View style={{height:30}}>

      </View>
    </ScrollView>
  );
}
