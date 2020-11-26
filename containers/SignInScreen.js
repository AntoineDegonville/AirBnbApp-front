import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState();
  const [missingmail, setMissingMail] = useState(false);
  const [password, setPassword] = useState();
  const [eyechecked1, setEyeChecked1] = useState(false);
  const navigation = useNavigation();
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (password === undefined || email === undefined) {
      return setError(true);
    } else {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        const userToken = response.data.token;
        setToken(userToken);
        alert(`Welcome back`);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <View style={styles.container}>
          <View style={styles.imgcontainer}>
            <Image
              resizeMode={"contain"}
              style={styles.img}
              source={require("../assets/logo.png")}
            ></Image>
            <Text style={styles.title}>Sign in</Text>
          </View>
          <View style={styles.inputs}>
            <TextInput
              keyboardType="email-address"
              onChangeText={(text) => {
                setEmail(text);
              }}
              placeholder={
                missingmail === false ? "email" : "-> We need your email"
              }
              inlineImageLeft="search_icon"
              value={email}
            />
          </View>
          <View style={styles.inputs}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => {
                if (eyechecked1 === false) {
                  setEyeChecked1(true);
                } else if (eyechecked1 === true) {
                  setEyeChecked1(false);
                }
              }}
            >
              <AntDesign
                style={styles.icon}
                name="eyeo"
                size={24}
                color="grey"
              />
            </TouchableOpacity>
            <TextInput
              placeholder="password"
              secureTextEntry={eyechecked1 === true ? false : true}
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
            />
          </View>
          <Text style={error === true ? styles.error : styles.noerror}>
            Please fill all fields
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.buttontext}
              title="Sign up"
              onPress={handleSubmit}
            >
              Sign in
            </Text>
          </TouchableOpacity>
          <Text
            onPress={() => {
              navigation.navigate("SignUp");
            }}
            style={styles.already}
          >
            Create an account
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  imgcontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 150,
    height: 200,
  },
  title: {
    fontSize: 20,
    paddingBottom: 50,
  },
  inputs: {
    borderBottomColor: "#EB5A62",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  touch: {
    zIndex: 10,
    position: "absolute",
    right: 0,
    color: "#EB5A62",
    width: 30,
    height: 30,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 100,
  },

  buttontext: {
    height: 50,
    width: 200,
    borderColor: "#EB5A62",
    borderRadius: 50,
    borderWidth: 2,
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 30,
    fontSize: 18,
  },
  error: {
    textAlign: "center",
    color: "red",
  },
  noerror: {
    display: "none",
  },
  already: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    color: "grey",
  },
});
