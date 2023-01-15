import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import SearchField from "../../components/SearchField";
import Categories from "../../components/Categories";
import products from "../../Data/products";
import { Colors, Fonts, Sizes ,Size} from '../../constants/styles';


const avatar = require("../../assets/images/user/user2.png");

const { width,height } = Dimensions.get("window");



const ShopScreen = ({navigation}) => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  return (
    <SafeAreaView>
      <ScrollView
        style={{

          padding: Size,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: Size,
              overflow: "hidden",
              width: Size * 4,
              height: Size * 4,
            }}
          >
            <BlurView
              style={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
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
            </BlurView>
          </TouchableOpacity>
          <View
            style={{
              width: Size * 4,
              height: Size * 4,
              overflow: "hidden",
              borderRadius: Size,
            }}
          >
            <BlurView
              style={{
                height: "100%",
                padding: Size / 2,
              }}
            >
 <Ionicons
                        name="shopping_cart"
                        size={Size * 3}
                        color={Colors.primaryColor}
                      />
              
            </BlurView>
          </View>
        </View>
        <View style={{ width: "80%", marginVertical: Size * 3 ,  color: Colors.blackColor
}}>
          <Text
            style={{
              color: Colors.blackColor,
              fontSize: Size * 3.5,
              fontWeight: "600",
            }}
          >
            Power up your workouts
          </Text>
        </View>
        <SearchField />
        <Categories onChange={(id) => setActiveCategoryId(id)} />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginVertical:Size*1.5,

          }}
        >
          {products
            .filter((product) => {
              if (activeCategoryId === null) {
                return true;
              }
              return product.categoryId === activeCategoryId;
            })
            .map((product) => (
              <View
                key={product.id}
                style={{
                  width: width / 2 - Size * 2,
                  marginBottom: Size,
                  borderRadius: Size * 2,
                  overflow: "hidden",
                  height:300,
                }}
              >
                <BlurView
                
                  intensity={95}
                  style={{
                    backgroundColor:Colors.lightBlackColor,
                    padding: Size*2,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 150,
                      width: "100%",
                    }}
                  >
                    <Image
                      source={product.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: Size * 2,
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        right: 0,
                        borderBottomStartRadius: Size * 3,
                        borderTopEndRadius: Size * 2,
                        overflow: "hidden",
                      }}
                    >
                      <BlurView
                        tint="dark"
                        intensity={70}
                        style={{
                          flexDirection: "row",
                          padding: Size - 2,
                        }}
                      >
                        <Ionicons
                          style={{
                            marginLeft: Size / 2,
                          }}
                          name="star"
                          color={Colors.DEFAULT_YELLOW}
                          size={Size * 2}
                        />
                        <Text
                          style={{
                            color: Colors.blackColor,
                            marginLeft: Size / 2,
                          }}
                        >
                          {product.rating}
                        </Text>
                      </BlurView>
                    </View>
                  </TouchableOpacity>
                  <Text
                    numberOfLines={2}
                    style={{
                      color: Colors.blackColor,
                      fontWeight: "500",
                      fontSize: Size * 1.5,
                      marginTop: Size,
                      marginBottom: Size / 2,
                    }}
                  >
                    {product.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ color: Colors.DARK_THREE, fontSize: Size * 1.2 }}
                  >
                    {product.included}
                  </Text>
                  <View
                    style={{
                      marginVertical: Size / 2,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          color: Colors.lightPrimaryColor,
                          marginRight: Size / 2,
                          fontSize: Size * 1.6,
                        }}
                      >
                        $
                      </Text>
                      <Text
                        style={{ color: Colors.DARK_ONE, fontSize: Size * 1.6 }}
                      >
                        {product.price}
                      </Text>
                    </View>
                    <TouchableOpacity
                           onPress={() => {
                    navigation.navigate('ProductInfo', {
                      product: product
                    });
                }}

                      style={{
                        backgroundColor: Colors.DEFAULT_WHITE,
                        padding: Size / 2,
                        borderRadius: Size,
                      }}
                    >
                      <Ionicons
                        name="add"
                        size={Size * 3}
                        color={Colors.primaryColor}
                      />
                    </TouchableOpacity>
                  </View>
                </BlurView>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({});
