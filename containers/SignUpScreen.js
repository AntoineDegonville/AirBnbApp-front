import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, TextInput, View, Image, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState();
  const [missingmail, setMissingMail] = useState(false);
  const [username, setUsername] = useState();
  const [missingusername, setMissingUsername] = useState(false);
  const [description, setDescription] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [eyechecked1, setEyeChecked1] = useState(false);
  const [eyechecked2, setEyeChecked2] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const userToken = "secret-token";
    if (password !== confirmPass) {
      return setError(true);
    } else if (email === undefined || username === undefined) {
      setMissingMail(true);
      setMissingUsername(true);
    } else {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/sign_up",
        {
          email: email,
          username: username,
          description: description,
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
      console.log(userToken);
      setToken(userToken);
      alert(`Welcome ${username}`);
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
            <Text style={styles.title}>Sign up</Text>
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
            <TextInput
              placeholder={
                missingusername === false
                  ? "username"
                  : " -> You need a username"
              }
              onChangeText={(text) => {
                setUsername(text);
              }}
              value={username}
            />
          </View>
          <View style={styles.aera}>
            <TextInput
              style={styles.textarea}
              multiline={true}
              placeholder="describe yourself"
              onChangeText={(text) => {
                setDescription(text);
              }}
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
          <View style={styles.inputs}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => {
                if (eyechecked2 === false) {
                  setEyeChecked2(true);
                } else if (eyechecked2 === true) {
                  setEyeChecked2(false);
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
              placeholder="confirm password"
              secureTextEntry={eyechecked2 === true ? false : true}
              onChangeText={(text) => {
                setConfirmPass(text);
              }}
              value={confirmPass}
            />
          </View>
          <Text style={error === true ? styles.error : styles.noerror}>
            Passwords must be the same
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.buttontext}
              title="Sign up"
              onPress={handleSubmit}
            >
              Sign up
            </Text>
          </TouchableOpacity>

          <Text
            onPress={() => {
              navigation.navigate("SignIn");
            }}
            style={styles.already}
          >
            Already have an account? Sign in
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
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
  },
  inputs: {
    borderBottomColor: "#EB5A62",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  aera: {
    borderColor: "#EB5A62",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 5,
    borderRadius: 5,
  },
  textarea: {
    paddingBottom: 40,
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
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
  already: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    color: "grey",
  },
  error: {
    textAlign: "center",
    color: "red",
  },
  noerror: {
    display: "none",
  },

  touch: {
    zIndex: 10,
    position: "absolute",
    right: 0,
    color: "#EB5A62",
    width: 30,
    height: 30,
  },
});
