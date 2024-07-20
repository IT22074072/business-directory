import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../constants/Colors";
import Category from '../../components/Home/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';

export default function explore() {

  const [businessList, setBusinessList]=useState([]);

  const GetBusinessByCategory=async(category)=>{
    setBusinessList([]);
    const q=query(collection(db, 'BusinessList'), where('category','==', category))
    const querySnapshot=await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList(prev=>[...prev,{id:doc.id, ...doc.data()}])
    });
  }
  return (
    <View style={{padding:25}}>
      <Text style={{fontFamily:'outfit-bold', fontSize:20}}>Explore More</Text>
      {/* Searchbar*/}
      <View style={{display:'flex', flexDirection:'row', gap:20, alignItems:'center', backgroundColor:'#fff', padding: 8,marginVertical:10, marginTop:17, borderRadius:8, borderWidth:1, borderColor:Colors.PRIMARY}}>
      <Ionicons name="search-sharp" size={24} color={Colors.PRIMARY} />
      <TextInput placeholder="Search..." style={{fontFamily:'outfit', fontSize:16}}/>
      </View>

      {/* Category*/}
      <Category 
      explore={true}
      onCategorySelect={(category)=>GetBusinessByCategory(category)}/>

      {/* Business List*/}
      <ExploreBusinessList businessList={businessList}/>

    </View>
  )
}