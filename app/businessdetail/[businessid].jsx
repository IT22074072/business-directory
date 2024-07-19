import { View, Text, ActivityIndicator, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { db } from "./../../configs/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Colors } from './../../constants/Colors'
import Intro from './../../components/BusinessDetail/Intro'
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";

export default function businessDetail() {
  const navigation = useNavigation();
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState([]); //don't forget to add this(empty array)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    GetBusinessDetailById();
  }, []);
  /**
   * Used to get BusinessDetail by Id
   */
  const GetBusinessDetailById = async () => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", businessid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBusiness(docSnap.data());
      setLoading(false);
    } else {
      //docSnap.data() will be undefined
      console.log("No such document!");
    }
  };
  return (
    <View>
      {loading ? (
        <ActivityIndicator style={{marginTop:'60%'}} size={"large"} color={Colors.PRIMARY}/>
      ) : (
        <View>
          {/*Intro*/}
          <Intro business={business}/>
          {/*Action Buttons*/}
          <ActionButton business={business}/>
          {/*About Section*/}
          <About business={business}/>

        </View>
      )}
    </View>
  );
}
