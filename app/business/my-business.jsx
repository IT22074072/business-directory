import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import BusinessListCard from "../../components/Explore/BusinessListCard";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";


export default function MyBusiness() {
  const { user } = useUser();
  const[businessList, setBusinessList]=useState([]);
  const navigation = useNavigation();
  const [loading, setLoading]=useState(false);


  useEffect(() => {
    navigation.setOptions({
        headerTitle: "My Business",
        headerShown: true,
        /*headerStyle:{
            backgroundColor:Colors.PRIMARY
        }*/
        
      });
    user && GetUserBusiness();
  }, [user]);


  /**
   * Used to get business list by useremail
   */
  const GetUserBusiness = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user?.primaryEmailAddress.emailAddress)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("User added business data" , doc.data());
      setBusinessList(prev=>[prev,{id:doc.id,...doc.data()}])
    });
    setLoading(false);
  };
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 17 }}>
        My Business
      </Text>



      <FlatList
      data={businessList}
      onRefresh={GetUserBusiness}
      refreshing={loading}
      renderItem={({item, index})=>(
        <BusinessListCard business={item} key={index}/>)}
      />


    </View>
  );
}
