import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import FlatBtn from "../UI/FlatButton";
import AuthForm from "./AuthForm";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
    username: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword, username } =
      credentials;

    username = username.trim();
    password = password.trim();
    if (!isLogin) {
      email = email.trim();
    }

    const usernameIsValid = username.length > 6;
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;
    const emailIsValid = !isLogin ? email.includes("@") : false;
    const emailsAreEqual = !isLogin ? email === confirmEmail : false;

    if (
      !usernameIsValid ||
      !passwordIsValid ||
      (!isLogin && !passwordsAreEqual)
    ) {
      var messageToShow = "Please check your entered credentials.";
      if (!usernameIsValid) {
        messageToShow =
          "Kindly enter a valid username with a minimum of 7 characters";
      } else if (!passwordIsValid) {
        messageToShow =
          "Kindly enter a valid password with a minimum of 7 characters";
      } else if (!passwordsAreEqual) {
        messageToShow = "Kindly enter matching passwords";
      } else if (!isLogin) {
        if (!emailIsValid) {
          messageToShow =
            "Kindly enter a correct email address including the @ character";
        } else if (!emailsAreEqual) {
          messageToShow = "Kindly enter matching email addresses";
        }
      }

      Alert.alert("Invalid input", messageToShow);
      setCredentialsInvalid(
        isLogin
          ? {
              username: !usernameIsValid,
              password: !passwordIsValid,
              confirmPassword: !passwordIsValid || !passwordsAreEqual,
            }
          : {
              email: !emailIsValid,
              confirmEmail: !emailIsValid || !emailsAreEqual,
              password: !passwordIsValid,
              confirmPassword: !passwordIsValid || !passwordsAreEqual,
              username: !usernameIsValid,
            }
      );
      return;
    }
    onAuthenticate(
      isLogin ? { username, password } : { email, password, username }
    );
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatBtn onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatBtn>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
