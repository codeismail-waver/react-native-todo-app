import { View, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../util/Colors";

function FloatingButton({ iconType, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        android_ripple={{ color: Colors.primary700 }}
        onPress={onPress}
      >
        <Ionicons name={iconType} size={24} color={Colors.white} />
      </Pressable>
    </View>
  );
}

export default FloatingButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    position: "absolute",
    right: 32,
    bottom: 32,
    borderRadius: 54,
    overflow: "hidden"
  },

  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },

  pressed: {
    opacity: 0.75,
    shadowColor: Colors.primary700,
  },
});
