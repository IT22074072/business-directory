import { View, Text, Image } from 'react-native'
import React from 'react'
import {useUser} from '@clerk/clerk-expo'

export default function UserIntro() {
    const {user}=useUser();
  return (
    <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Image source={{uri:user?.imageUrl}} style={{width:100, height:100, borderRadius:99, marginTop:30}}/>
        <Text style={{fontFamily:'outfit-bold', fontSize:14, marginTop:3}}>{user?.fullName}</Text>
        <Text style={{fontFamily:'outfit', fontSize:14}}>{user?.primaryEmailAddress?.emailAddress}</Text>

    </View>
  )
}