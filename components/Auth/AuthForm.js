import { useState } from "react";
import { StyleSheet, View } from "react-native";

import CustomBtn from "../UI/Button";
import Input from "./Input";
import { Colors } from "../../constants/styles";
import IconButtonWithBorder from "../UI/IconButtonWithBorder";

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

  function openGoogleSignupHandler() {}

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
          placeholder="Full Name"
          placeholderTextColor={Colors.inputColor}
          iconcolor={Colors.inputColor}
          iconsize={24}
          iconname="person-circle"
          maxLength={51}
        />
        {!isLogin && (
          <Input
            label="Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, "email")}
            value={enteredEmail}
            keyboardType="email-address"
            isInvalid={emailIsInvalid}
            placeholder="Email address"
            placeholderTextColor={Colors.inputColor}
            iconcolor={Colors.inputColor}
            iconsize={24}
            iconname="at-outline"
            maxLength={255}
          />
        )}
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
            placeholder="Confirm Email Address"
            placeholderTextColor={Colors.inputColor}
            iconcolor={Colors.inputColor}
            iconsize={24}
            iconname="at-outline"
            maxLength={255}
          />
        )}
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
          placeholder="Enter Password"
          placeholderTextColor={Colors.inputColor}
          iconcolor={Colors.inputColor}
          iconsize={24}
          iconname="lock-closed"
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
            placeholder="Enter Confirm Password"
            placeholderTextColor={Colors.inputColor}
            iconcolor={Colors.inputColor}
            iconsize={24}
            iconname="lock-closed"
          />
        )}
        <View style={styles.buttons}>
          <CustomBtn onPress={submitHandler}>
            {isLogin ? "Log In" : "Sign Up"}
          </CustomBtn>
          <IconButtonWithBorder
            icon="logo-google"
            color={Colors.formColor}
            size={24}
            onPress={openGoogleSignupHandler}
          >
            Sign Up With Google
          </IconButtonWithBorder>
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
