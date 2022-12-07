import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { Colors,Size } from "../constants/styles";

import { Ionicons } from "@expo/vector-icons";

const SearchField = () => {
  return (
    <View
      style={{
        borderRadius: Size,
        overflow: "hidden",
        backgroundColor:Colors.lightBlackColor,
        marginVertical:Size*1,


      }}
    >
      <BlurView
        intensity={30}
        style={{
          alignItems: "center",

          justifyContent: "center",
        }}
      >
        <TextInput
          style={{
            width: "100%",
            color: Colors.DEFAULT_WHITE,
            fontSize: Size * 1.7,
            padding: Size,
            paddingLeft: Size * 3.5,
          }}
          placeholder="Find Your ..."
          placeholderTextColor={Colors.DEFAULT_WHITE}
        />
        <Ionicons
          style={{
            position: "absolute",
            left: Size,
          }}
          name="search"
          color={Colors.DARK_TWO}
          size={Size * 2}
        />
      </BlurView>
    </View>
  );
};

export default SearchField;

const styles = StyleSheet.create({});
