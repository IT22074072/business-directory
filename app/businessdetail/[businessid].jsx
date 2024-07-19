import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { db } from "./../../configs/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Colors } from './../../constants/Colors'

export default function businessDetail() {
  const { businessid } = useLocalSearchParams();
  const [businessDetail, setBusinessDetail] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
      setBusinessDetail(docSnap.data());
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
          
        </View>
      )}
    </View>
  );
}
