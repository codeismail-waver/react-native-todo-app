import { View, Pressable, Text, StyleSheet } from "react-native";
import Colors from "../util/Colors";

function Button({ label, onPress, disableView }) {
  return (
    <View style={styles.buttonOuterContainer} pointerEvents={disableView? "none": "auto"}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? (disableView ? [styles.buttonInnerContainer, styles.disableViewBackground, styles.pressed] : 
                [styles.buttonInnerContainer, styles.pressed])
            : (disableView? [styles.buttonInnerContainer, styles.disableViewBackground] : styles.buttonInnerContainer)
        }
        android_ripple={{ color: Colors.primary700 }}
        onPress={onPress}
      >
        <Text style={(disableView? [styles.buttonText, styles.disableButtonText] : styles.buttonText)}>{label}</Text>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 16,
    margin: 8,
    overflow: "hidden",
    width: "100%",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontWeight: "500"
  },
  disableViewBackground:{
    backgroundColor: Colors.gray
  },
  disableButtonText: {
    color: Colors.darkGray,
  },
  pressed: {
    opacity: 0.75,
    shadowColor: Colors.primary700,
  },
});
