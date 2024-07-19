import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import {db} from './../../configs/FirebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

export default function businessDetail() {
    const {businessid} = useLocalSearchParams();

    useEffect(()=>{
      GetBusinessDetailById();
    }, [])
    /**
     * Used to get BusinessDetail by Id
     */
    const GetBusinessDetailById=async()=>{

      const docRef = doc(db, 'BusinessList', businessid);
      const docSnap=await getDoc(docRef);
      if(docSnap.exists()){
        console.log("Document data:", docSnap.data());
      }
      else{
        //docSnap.data() will be undefined
        console.log("No such document!");
      }

    }
  return (
    <View>
      <Text>{businessid}</Text>
    </View>
  )
}