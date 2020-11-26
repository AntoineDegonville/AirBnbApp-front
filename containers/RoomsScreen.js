import React, { useEffect, useState, PureComponent } from "react";
import { useRoute } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LottieView } from "lottie-react-native";
import MapView from "react-native-maps";

import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableOpacity } from "react-native";

export default function RoomsScreen() {
  const width = Dimensions.get("window").width;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const { params } = useRoute();
  const id = params.userId;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${id}`
      );

      setData(response.data);
      setLongitude(response.data.location[0]);
      setLatitude(response.data.location[1]);
      setIsLoading(true);
      console.log(data.ratingValue);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  return !isLoading ? (
    <View style={styles.lottie}></View>
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
      <View style={styles.content}>
        <Image
          style={styles.contentimg}
          source={{ uri: data.photos[0].url }}
        ></Image>
        <View style={styles.contentprice}>
          <Text style={styles.price}>{data.price} €</Text>
        </View>
        <View style={styles.description}>
          <View style={styles.titlerate}>
            <Text numberOfLines={1} style={styles.title}>
              {data.title}
            </Text>
            <View style={styles.rate}>
              <Text>
                <Entypo
                  name="star"
                  size={20}
                  color={data.ratingValue >= 1 ? "orange" : "grey"}
                />
                <Entypo
                  name="star"
                  size={20}
                  color={data.ratingValue >= 2 ? "orange" : "grey"}
                />
                <Entypo
                  name="star"
                  size={20}
                  color={data.ratingValue >= 3 ? "orange" : "grey"}
                />
                <Entypo
                  name="star"
                  size={20}
                  color={data.ratingValue >= 4 ? "orange" : "grey"}
                />
                <Entypo
                  name="star"
                  size={20}
                  color={data.ratingValue >= 5 ? "orange" : "grey"}
                />
              </Text>
              <Text> {data.reviews} reviews</Text>
            </View>
          </View>
          <View style={styles.avatarcontainer}>
            <Image
              style={styles.avatarcontent}
              source={{ uri: data.user.account.photo.url }}
            ></Image>
          </View>
        </View>
        <View style={styles.textarea}>
          <Text numberOfLines={show ? 10 : 3}>{data.description}</Text>
        </View>
        <TouchableOpacity
          style={{ display: show ? "none" : "flex" }}
          onPress={() => {
            setShow(true);
          }}
        >
          <Text style={{ color: "grey" }}>
            Show more <AntDesign name="caretdown" size={12} color="grey" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ display: show ? "flex" : "none" }}
          onPress={() => {
            setShow(false);
          }}
        >
          <Text style={{ color: "grey" }}>
            Show less <AntDesign name="caretup" size={12} color="grey" />
          </Text>
        </TouchableOpacity>
        <MapView
          style={{ width: 392, height: 200 }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <MapView.Marker
            key={data._id}
            coordinate={{ latitude: latitude, longitude: longitude }}
            title={data.title}
          />
        </MapView>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  lottie: {
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
    marginBottom: 10,
    paddingBottom: 60,
  },
  headerimg: {
    height: 50,
  },
  offers: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  content: {
    marginBottom: 20,
  },
  contentimg: {
    height: 200,
    // backgroundColor: "blue",
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
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  price: {
    color: "white",
    fontSize: 20,
  },
  titlerate: {
    width: 250,
    height: 80,
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
    marginTop: 10,
    paddingLeft: 10,
    width: 200,
    height: 30,
    color: "red",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  previous: {
    width: 30,
    height: 30,
    color: "black",
    zIndex: 5,
    backgroundColor: "black",
  },
});
