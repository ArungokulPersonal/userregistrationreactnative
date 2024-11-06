import { useState } from "react";
import { StyleSheet, View } from "react-native";

import CustomBtn from "../UI/Button";
import Input from "./Input";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredUsername, setEnteredUsername] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
    username: usernameIsInvalid,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        enteredValue = enteredValue.replace(/[^a-zA-Z0-9]/g, "");
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        enteredValue = enteredValue.replace(/[^a-zA-Z0-9]/g, "");
        setEnteredConfirmPassword(enteredValue);
        break;
      case "username":
        setEnteredUsername(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit(
      isLogin
        ? {
            username: enteredUsername,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
          }
        : {
            email: enteredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
            username: enteredUsername,
          }
    );
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Username"
          onUpdateValue={updateInputValueHandler.bind(this, "username")}
          value={enteredUsername}
          keyboardType="default"
          isInvalid={usernameIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, "email")}
            value={enteredEmail}
            keyboardType="email-address"
            isInvalid={emailIsInvalid}
          />
        )}
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <CustomBtn onPress={submitHandler}>
            {isLogin ? "Log In" : "Sign Up"}
          </CustomBtn>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
