import { View, Text, TextInput, StyleSheet } from "react-native";

import { Colors } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder,
  placeholderTextColor,
  iconname,
  iconcolor,
  iconsize,
  maxLength,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <View style={styles.container}>
        <Ionicons name={iconname} color={iconcolor} size={iconsize} />
        <TextInput
          style={[styles.input, isInvalid && styles.inputInvalid]}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          autoCapitalize={false}
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onUpdateValue}
          value={value}
        />
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: Colors.inputTypeColor,
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "transparent",
    color: Colors.inputTypeColor,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.inputColor,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 10,
  },
  icon: {
    marginRight: 10,
  },
});
