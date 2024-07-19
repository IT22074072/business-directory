import { View, Text, FlatList } from 'react-native'
import React from 'react'

export default function ActionButton(business) {
    const actionButtonMenu = [
        {
            id:1,
            name:'Call',
            icon:'./../../assets/images/call.png',
            url:'tel'+business?.contact
        },
        {
            id:2,
            name:'Location',
            icon:'./../../assets/images/pin.png',
            url:'https://www.google.com/maps/search/?api=1&query='+business?.address
        },
        {
            id:3,
            name:'Web',
            icon:'./../../assets/images/web.png',
            url:'tel'+business?.website
        },
        {
            id:4,
            name:'Share',
            icon:'./../../assets/images/share.png',
            url:'tel'+business?.website
        },
    ]


  return (
    <View style={{backgroundColor:'#fff', padding:20}}>
      
    </View>
  )
}