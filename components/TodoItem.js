import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import IconButton from "./IconButton";
import Colors from "../util/Colors";
import Checkbox from "expo-checkbox";
import { format } from "date-fns";
import StringConstants from "../util/StringConstants";

function TodoItem({ todo, onPress, onCheckboxPress, onDeletePress }) {
  const [isChecked, setChecked] = useState(todo.isCompleted);


  return (
    <View style={styles.rootContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.innerContainer, styles.pressed]
            : styles.innerContainer
        }
        android_ripple={{ color: Colors.gray }}
        onPress={onPress}
      >
        <View style={styles.labelContainer}>
          <Text style={styles.title}>{todo.title}</Text>
          {todo.isCompleted && (
            <Text>
              Date Completed: 
              {` ${(todo.dateCompleted === null || typeof(todo.dateCompleted) === "undefined")
                ? "N/A"
                : todo.dateCompleted}`}
            </Text>
          )}
          {!todo.isCompleted && (
            <Text>
              Date created: 
              {` ${format(
                new Date(todo.dateCreated),
                StringConstants.dateFormatter
              )}`}
            </Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={(_isChecked) => {
              onCheckboxPress();
              setChecked(_isChecked);
            }}
          />
          <IconButton
            iconType="trash-bin-outline"
            color={Colors.red}
            style={styles.button}
            onPress={onDeletePress}
          />
        </View>
      </Pressable>
    </View>
  );
}

export default TodoItem;

const styles = StyleSheet.create({
  rootContainer: {
    borderRadius: 4,
    marginVertical: 4,
    width: "100%",
    height: 64,
    borderColor: Colors.gray,
    borderWidth: 1,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelContainer: {
    marginHorizontal: 16,
    paddingVertical: 8,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginHorizontal: 12,
  },
  button: {
    marginHorizontal: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  checkbox: {
    margin: 8,
  },
  pressed: {
    opacity: 0.5,
    shadowColor: Colors.gray,
  },
});
