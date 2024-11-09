import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { SUCCESSANIMATIONJSON } from "../constants/styles";

function SuccessAnimationScreen() {
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

  return (
    <View style={styles.container}>
      <View style={styles.success}>
        <AnimatedLottieView
          style={styles.lottiestyle}
          source={SUCCESSANIMATIONJSON}
          progress={animationProgress.current}
          autoPlay
          loop
        />
      </View>
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
    flex: 1,
  },
});
