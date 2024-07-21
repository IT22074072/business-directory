import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";


export default function Intro({ business }) {
  const router = useRouter();
  const {user}=useUser();
  const onDelete=()=>{
    Alert.alert('Do you want to Delete?', 'Do you really want to Delete this business?',[{
      text:'Cancel',
      style:'cancel',
    },
    {
      text:'Delete',
      style:'destructive',
      onPress:()=>deleteBusiness()
    }
  
  ])
  }

  const deleteBusiness=async()=>{
    console.log('Delete Business');
    await deleteDoc(doc(db,'BusinessList', business?.id));
    router.back();
    ToastAndroid.show('Business Deleted!', ToastAndroid.LONG)
  }
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 12,
          paddingTop: 35,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={26} color="black" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={26} color="black" />
      </View>
      <Image
        source={{ uri: business.imageUrl }}
        style={{ width: "100%", height: 260 }}
      />

      <View style={{padding:20, marginTop:-20, backgroundColor:'#fff', borderTopLeftRadius:25, borderTopRightRadius:25}}>
        <View style={{display:'flex', flexDirection:'row',justifyContent:'space-between', width:'100%'}}>
        <Text style={{fontSize:17, fontFamily:'outfit-bold'}}>{business.name}</Text>
        {user?.primaryEmailAddress?.emailAddress==business?.userEmail&&<TouchableOpacity onPress={()=>onDelete()}>
        <Ionicons name="trash" size={24} color="red" />

        </TouchableOpacity>}
        </View>
        
        <Text style={{fontSize:14, fontFamily:'outfit', color:Colors.GRAY}}>{business.address}</Text>
      </View>
    </View>
  );
}
