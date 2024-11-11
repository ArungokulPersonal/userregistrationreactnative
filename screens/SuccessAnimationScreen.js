import React, { useEffect, useRef } from "react";
import { Text, View, Animated, Easing, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { SUCCESSANIMATIONJSON } from "../constants/styles";

function SuccessAnimationScreen({ navigation }) {
  const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  function animationCompletedRedirect() {
    navigation.replace("Welcome");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.submitText}>Successfully Submitted!</Text>
      <View style={styles.success}>
        <AnimatedLottieView
          style={styles.lottiestyle}
          source={SUCCESSANIMATIONJSON}
          progress={animationProgress.current}
          autoPlay={true}
          loop={true}
          onAnimationFinish={animationCompletedRedirect}
        />
      </View>
      <Text style={styles.belowText}>
        Our representatives will get in touch with you shortly
      </Text>
    </View>
  );
}

export default SuccessAnimationScreen;

const styles = StyleSheet.create({
  success: {
    flex: 1,
    height: 300,
    width: 100,
    aspectRatio: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 100,
  },
  lottiestyle: {
    flex: 2,
    marginTop: 20,
  },
  submitText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
  belowText: {
    flex: 1,
    marginTop: 30,
    fontSize: 18,
    fontWeight: "light",
    color: "gray",
  },
});
