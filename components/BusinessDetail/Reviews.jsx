import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "../../constants/Colors";
import { db } from "../../configs/FirebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

export default function Reviews({ business }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState([]);
  const { user } = useUser();

  const onSubmit = async () => {
    const docRef = doc(db, "BusinessList", business?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        Comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      }),
    });

    ToastAndroid.show("Comment Added Successfully!", ToastAndroid.BOTTOM);
  };
  return (
    <View style={{ padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 17 }}>Reviews</Text>
      <View>
        <Rating
          showRating={false}
          imageSize={30}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />

        <TextInput
          placeholder="Write your comment"
          numberOfLines={5}
          onChangeText={(value) => setUserInput(value)}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.GRAY,
            textAlignVertical: "top",
          }}
        />

        <TouchableOpacity
          disabled={!userInput}
          onPress={() => onSubmit()}
          style={{
            backgroundColor: userInput ? Colors.PRIMARY : Colors.GRAY,
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontFamily: "outfit", color: "#fff", textAlign: "center" }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      {/*Display Previous Reviews*/}
      <View>
        {business?.reviews?.map((item, index) => (
          <View style={{display:'flex', flexDirection:'row',gap:15, alignItems:'center' , padding:10, borderWidth:1, borderColor:Colors.GRAY,borderRadius:15, marginTop:10}}>
            <Image
              source={{ uri: item.userImage }}
              style={{ width: 50, height: 50, borderRadius: 99 }}
            />
            <View style={{ display: "flex", gap:5 }}>
              <Text style={{fontFamily:'outfit-medium'}}> {item.userName}</Text>
              <Rating
                imageSize={20}
                ratingCount={item.rating}
                style={{ alignItems: "flex-start" }}
              />
              <Text>{item.Comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
