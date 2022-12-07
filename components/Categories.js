import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import categories from "../Data/categories";
import { Colors,Size } from "../constants/styles";

const Categories = ({ onChange }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const handlePress = (id) => {
    setActiveCategoryId(id);
    onChange(id);
  };

  return (
    <FlatList
      horizontal={true}
      data={categories}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ marginVertical: Size }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePress(item.id)}
          style={{ marginRight: Size * 2, alignItems: "center" }}
        >
          <Text
            style={[
              { color: Colors.lightBlackColor, fontSize: Size *2,paddingtop: Size/2
 },
              activeCategoryId === item.id && { color: Colors.primary2 },
            ]}
          >
            {item.name}
          </Text>
          {activeCategoryId === item.id && (
            <View
              style={{
                height: Size,
                width: Size,
                backgroundColor: Colors.primaryColor,
                borderRadius: Size / 2,
                marginTop: Size /2,
              }}
            />
          )}
        </TouchableOpacity>
      )}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({});
