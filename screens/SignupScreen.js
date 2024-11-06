import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser, createUserWithSpringBootAPI } from "../util/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({ email, password, username }) {
    setIsAuthenticating(true);
    try {
      // await createUser(email, password);
      await createUserWithSpringBootAPI(email, username, password);
    } catch (error) {
      Alert.alert(
        "User Creation Failed",
        "Could not create the user. Please check the credentials and try again later"
      );
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user... " />;
  }

  return <AuthContent isLogin={false} onAuthenticate={signupHandler} />;
}

export default SignupScreen;
