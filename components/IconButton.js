import { View, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../util/Colors";


function IconButton({ iconType, color, style, onPress }){
    return (
        <View style={[styles.buttonOuterContainer, style]}>
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.buttonInnerContainer, styles.pressed]
                : styles.buttonInnerContainer
            }
            android_ripple={{ color: Colors.gray }}
            onPress={onPress}
          >
            <Ionicons name={iconType} size={24} color={color} />
          </Pressable>
        </View>
      );
}


export default IconButton

const styles = StyleSheet.create({
    buttonOuterContainer: {
      overflow: "hidden"
    },
  
    buttonInnerContainer: {
      backgroundColor: Colors.transparent,
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center",
      
    },
  
    pressed: {
      opacity: 0.25,
      shadowColor: Colors.darkGray,
    },
  });
