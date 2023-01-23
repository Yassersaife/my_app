import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts, Sizes ,Size} from '../../constants/styles';
import { BlurView } from "expo-blur";

const { height, width } = Dimensions.get("window");

const sizes = ["S", "M", "L"];
const Weight = ["5kg","10kg", "20kg","25kg" ];
const Taste=["Chocolate","Strawberry","Banana"];

const ProductInfo = ({ navigation,route }) => {
  const [activeItem, setActiveItem] = useState('');
  const { product} = route.params;

  
  return (
    <>
      <ScrollView>
        <SafeAreaView>
          <ImageBackground
            source={product.image}
            style={{
              height: height / 2 + Size * 2,

              justifyContent: "space-between",
            }}
            imageStyle={{
              borderRadius: Size * 3,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: Size * 2,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.DEFAULT_WHITE,
                  padding: Size,
                  borderRadius: Size * 1.5,
                }}
              >
                <Ionicons
                  name="arrow-back"
                  color={Colors.primaryColor}
                  size={Size * 2}
                  onPress={() => navigation.pop()}
           
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.DEFAULT_WHITE,
                  padding: Size,
                  borderRadius: Size * 1.5,
                }}
              >
                <Ionicons
                  name="heart"
                  color={Colors.DEFAULT_RED}
                  size={Size * 2}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderRadius: Size * 3,
                overflow: "hidden",
              }}
            >
              <BlurView
                intensity={80}
                tint="dark"
                style={{
                  padding: Size * 2,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: Size * 2,
                      color: Colors.DEFAULT_WHITE,
                      fontWeight: "600",
                      marginBottom: Size,
                    }}
                  >
                    {product.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: Size * 1.8,
                      color: Colors["white-smoke"],
                      fontWeight: "500",
                      marginBottom: Size,
                    }}
                  >
                    {product.included}
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: Size }}>
                    <Ionicons
                      name="star"
                      size={Size * 1.5}
                      color={Colors.DEFAULT_YELLOW}
                    />
                    <Text
                      style={{
                        color: Colors.DEFAULT_WHITE,
                        marginLeft: Size,
                      }}
                    >
                      {product.rating}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "35%",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    
                  </View>
                  <View
                    style={{
                      backgroundColor: Colors.dark,
                      padding: Size / 2,
                      borderRadius: Size / 2,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    
                  </View>
                </View>
              </BlurView>
            </View>
          </ImageBackground>

          <View
            style={{
              padding: Size,
            }}
          >
            <Text
              style={{
                color: Colors.DEFAULT_BLACK,
                fontSize: Size * 1.7,
                marginBottom: Size,
              }}
            >
              Description
            </Text>
            <Text numberOfLines={3} style={{ color: Colors.DEFAULT_BLACK }}>
              {product.description}
            </Text>
            
            
          </View>
        </SafeAreaView>
      </ScrollView>
      <SafeAreaView
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <View
          style={{
            padding: Size,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: Size * 3,
          }}
        >
          <Text style={{ color: Colors.blackColor, fontSize: Size * 1.5}}>
            Price
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: Colors.primaryColor, fontSize: Size * 2.5 }}>
              $
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontSize: Size * 2.5,
                marginLeft: Size / 2,
              }}
            >
              {product.price}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            marginRight: Size,
            backgroundColor: Colors.primaryColor,
            width: width / 2 + Size * 3,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: Size * 2,
          }}
        >
          <Text
            style={{
              color: Colors.DEFAULT_WHITE,
              fontSize: Size * 2,
              fontWeight: "700",
            }}
          >
            Buy Now
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({});
