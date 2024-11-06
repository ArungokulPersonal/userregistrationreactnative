import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser, createUserWithSpringBootAPI } from "../util/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password, username }) {
    setIsAuthenticating(true);
    try {
      // await createUser(email, password);
      const token = await createUserWithSpringBootAPI(
        email,
        username,
        password
      );
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "User Creation Failed",
        "Could not create the user. Please check the credentials and try again later"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user... " />;
  }

  return <AuthContent isLogin={false} onAuthenticate={signupHandler} />;
}

export default SignupScreen;
