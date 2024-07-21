import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import {
  collection,
  query,
  getDocs,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../../configs/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const { user } = useUser();

  //Set default values ("") for all state variables.
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
    });
    GetCategoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    setImage(result?.assets[0].uri);
  };

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
  };

  const onAddNewBusiness = async () => {
    setLoading(true);
    try {
      // Generate a unique filename using the current timestamp
      const fileName = Date.now().toString() + ".jpg";

      // Fetch the image from the provided URL
      const resp = await fetch(image);

      // Convert the response to a Blob object
      const blob = await resp.blob();

      // Create a reference to the storage location in Firebase
      const imageRef = ref(storage, "business-app/" + fileName);

      // Upload the Blob to the specified location
      const snapshot = await uploadBytes(imageRef, blob);
      console.log("File uploaded...");

      // Get the download URL
      const downloadUrl = await getDownloadURL(imageRef);
      console.log(downloadUrl);
      saveBusinessDetail(downloadUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };

  const saveBusinessDetail = async (imageUrl) => {
    try {
      await setDoc(doc(db, "BusinessList", Date.now().toString()), {
        //Added checks in the saveBusinessDetail function to ensure all fields have a value before saving
        name: name || "N/A",
        address: address || "N/A",
        contact: contact || "N/A",
        about: about || "N/A",
        website: website || "N/A",
        category: category || "N/A",
        username: user?.fullName || "N/A",
        userEmail: user?.emailAddresses[0]?.emailAddress || "N/A",
        userImage: user?.imageUrl || "N/A",
        imageUrl: imageUrl || "N/A",
      });
      setLoading(false);
      ToastAndroid.show("New business added....", ToastAndroid.LONG);
      navigation.goBack(); // Navigate back after successful save
    } catch (error) {
      console.error("Error saving business details:", error);
      setLoading(false); // Stop loading if there's an error
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 17 }}>
        Add New Business
      </Text>
      <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
        Fill all details in order to add new business
      </Text>
      <TouchableOpacity onPress={() => onImagePick()}>
        <View
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: "#E5E4E2",
            borderRadius: 15,
            height: 100,
            width: 100,
          }}
        >
          {!image ? (
            <Image
              source={require("./../../assets/images/camera.png")}
              style={{ width: 80, height: 80, borderRadius: 15 }}
            />
          ) : (
            <Image
              source={{ uri: image }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 15,
              }}
            />
          )}
        </View>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <TextInput
          onChangeText={(v) => setName(v)}
          placeholder="Name"
          style={{
            padding: 5,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <TextInput
          onChangeText={(v) => setAddress(v)}
          placeholder="Address"
          style={{
            padding: 5,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <TextInput
          onChangeText={(v) => setContact(v)}
          placeholder="Contact"
          style={{
            padding: 5,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <TextInput
          onChangeText={(v) => setWebsite(v)}
          placeholder="Website"
          style={{
            padding: 5,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <TextInput
          onChangeText={(v) => setAbout(v)}
          multiline
          placeholder="About"
          numberOfLines={5}
          textAlignVertical="center"
          style={{
            padding: 5,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
            height: 100,
          }}
        />

        <View
          style={{
            padding: -1,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#fff",
            borderColor: Colors.PRIMARY,
            marginTop: 10,
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={categoryList}
          />
        </View>
      </View>

      <TouchableOpacity
        disabled={loading}
        onPress={() => onAddNewBusiness()}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"#fff"} />
        ) : (
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "outfit-medium",
            }}
          >
            Add New Business
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
