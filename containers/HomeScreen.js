import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import LottieView from "lottie-react-native";
import { Text, View, ActivityIndicator, Image, StyleSheet } from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "react-native";
import { FlatList } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function HomeScreen(token) {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // console.log("data>>>>>>>>>>>>>>", data[0].user.account.photo.url);

  const fetchData = async () => {
    const response = await axios.get(
      "https://express-airbnb-api.herokuapp.com/rooms"
    );
    setData(response.data);
    setIsLoading(true);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  // const displayStars = (ratingValue) => {
  //   let tab = [];
  //   for (let i = 1; i <= 5; i++) {
  //     if (ratingValue < i) {
  //       tab.push(<Entypo name="star" size={20} color="orange" />);
  //     } else {
  //       <Entypo name="star" size={20} color="grey" />;
  //     }
  //   }
  //   return tab;
  // };

  return !isLoading ? (
    <View style={styles.loader}>
      {/* <ActivityIndicator style={styles.loader} size="large" color="#0000ff" /> */}
      {/* <LottieView
        style={{ width: 150, height: 150, backgroundColor: "white" }}
        autoPlay
        source={require("../assets/loader.json")}
      /> */}
    </View>
  ) : (
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" backgroundColor="white"></StatusBar>
      <View style={styles.header}>
        <Image
          style={styles.headerimg}
          source={require("../assets/logo.png")}
          resizeMode="contain"
        ></Image>
      </View>
      <FlatList
        style={styles.offers}
        data={data}
        renderItem={({ item }) => (
          <View keyExtractor={(item) => item.id} style={styles.content}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Rooms", { userId: item._id });
              }}
            >
              <Image
                style={styles.contentimg}
                source={{ uri: item.photos[0].url }}
              ></Image>
              <View style={styles.contentprice}>
                <Text style={styles.price}>{item.price} €</Text>
              </View>
              <View style={styles.description}>
                <View style={styles.titlerate}>
                  <Text numberOfLines={1} style={styles.title}>
                    {item.title}
                  </Text>
                  <View style={styles.rate}>
                    <Text>
                      <Entypo
                        name="star"
                        size={20}
                        color={item.ratingValue >= 1 ? "orange" : "grey"}
                      />
                      <Entypo
                        name="star"
                        size={20}
                        color={item.ratingValue >= 2 ? "orange" : "grey"}
                      />
                      <Entypo
                        name="star"
                        size={20}
                        color={item.ratingValue >= 3 ? "orange" : "grey"}
                      />
                      <Entypo
                        name="star"
                        size={20}
                        color={item.ratingValue >= 4 ? "orange" : "grey"}
                      />
                      <Entypo
                        name="star"
                        size={20}
                        color={item.ratingValue >= 5 ? "orange" : "grey"}
                      />
                    </Text>
                    <Text> {item.reviews} reviews</Text>
                  </View>
                </View>
                <View style={styles.avatarcontainer}>
                  <Image
                    style={styles.avatarcontent}
                    source={{ uri: item.user.account.photo.url }}
                  ></Image>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    height: 50,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    borderBottomColor: "grey",
    marginBottom: 10,
    paddingBottom: 60,
    borderBottomWidth: 1,
  },
  headerimg: {
    height: 50,
  },
  offers: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  content: {
    height: 300,
    // backgroundColor: "red",
    borderBottomWidth: 1,
    // borderColor: "yellow",
    marginBottom: 20,
  },
  contentimg: {
    height: 200,
    position: "relative",
    marginBottom: 5,
  },
  contentprice: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    top: 140,
    height: 50,
    width: 100,
    backgroundColor: "black",
  },
  description: {
    flexDirection: "row",
  },
  price: {
    color: "white",
    fontSize: 20,
  },
  titlerate: {
    width: 250,
    height: 80,
    // backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  avatarcontainer: {
    paddingRight: 0,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarcontent: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  rate: {
    // backgroundColor: "blue",
    marginTop: 20,
    paddingLeft: 10,
    width: 200,
    height: 30,
    color: "red",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
});
