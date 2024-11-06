import AuthContent from "../components/Auth/AuthContent";
import { useState } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { login, loginUserWithSpringBootAPI } from "../util/auth";
import { Alert } from "react-native";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      // await login(email, password);
      await loginUserWithSpringBootAPI(email, password);
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Could not log you in. Please check the credentials and try again later"
      );
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in... " />;
  }

  return <AuthContent isLogin={true} onAuthenticate={loginHandler} />;
}

export default LoginScreen;
