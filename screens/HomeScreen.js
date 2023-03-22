import { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  FlatList,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import Colors from "../util/Colors";
import Button from "../components/Button";
import FloatingButton from "../components/FloatingButton";
import TodoItem from "../components/TodoItem";
import { format } from "date-fns";
import Todo from "../data/Todo";
import uuid from "react-native-uuid";
import StringConstants from "../util/StringConstants";
import DateTimePicker from "@react-native-community/datetimepicker";
import IconButton from "../components/IconButton";


function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isNewTask, setIsNewTask] = useState(true);
  const [enteredTask, setEnteredTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState();
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [isIOSDateSelected, setIsIOSDateSelected] = useState(false);
  const isIOS = Platform.OS == "ios";


  const currentDate = (formatter) => {
    return format(Date.now(), formatter);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDate(isIOS);
    setDate(currentDate);

    switch (event.type) {
      case "set":
        setIsIOSDateSelected(isIOS)
        updateTodoDateCompleted(selectedTodo, currentDate);
        
        break;
      case "dismissed": //Android
        updateTodoDateCompleted(selectedTodo, null);
        break;
      default:
        break;
    }
    if (!isIOS) {
      setDate(new Date());
    }
  };

  const renderTodoModal = () => {
    return (
      modalVisible && (
        <View style={styles.modalContainer}>
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <IconButton
                  iconType="md-close"
                  color={Colors.darkGray}
                  style={styles.modalCloseButton}
                  onPress={onCloseButtonPressHandler}
                />
                <Text style={styles.modalHeaderText}>
                  {isNewTask
                    ? StringConstants.addNewTask
                    : StringConstants.editTask}
                </Text>
                <TextInput
                  style={styles.modalTextInput}
                  value={enteredTask}
                  onChangeText={enteredTaskHandler}
                />
                <Button
                  label={StringConstants.saveTask}
                  onPress={onSaveTodoHandler}
                  disableView={enteredTask.length === 0}
                />
              </View>
            </View>
          </Modal>
        </View>
      )
    );
  };

  const renderDatePicker = () => {
    return (
      showDate && (
        <View
          style={{ zIndex: 1 }}
        >
          {isIOS && (
            <IconButton
              iconType="md-close"
              color={Colors.darkGray}
              style={[styles.modalCloseButton, styles.iosDatePickerCloseBtn]}
              onPress={onCloseIOSDatePicker}
            />
          )}
          {
            <View  >
                <DateTimePicker
              testID="dateTimePicker"
              value={date}
              onChange={onChange}
              display={isIOS ? "spinner" : "calendar"}
              maximumDate={new Date()}
              style={{ backgroundColor: Colors.white }}
            />
            </View>
          }
        </View>
      )
    );
  };

  const renderTodoList = () => {

    const sortedTodos = todos.sort((first, second) => {
        return first.isCompleted - second.isCompleted
      })
    return (
      <FlatList
      
        data={sortedTodos}
        renderItem={(todo) => {
          return (
            <TodoItem
              todo={todo.item}
              onPress={onTodoPressHandler.bind(this, todo.item)}
              onCheckboxPress={onTodoCompletedHandler.bind(this, todo.item)}
              onDeletePress={onTodoDeletedHandler.bind(this, todo.item.id)}
            />
          );
        }}
        keyExtractor={(todo) => todo.id}
      />
    );
  };


  function updateTodoDateCompleted(todo, dateCompleted){
    const todoIndex = todos.findIndex((_todo) => _todo.id == todo.id);
    if (todos[todoIndex].isCompleted) {
        todos[todoIndex].dateCompleted = (dateCompleted !== null) ? format(
          dateCompleted,
          StringConstants.dateFormatter
        ): dateCompleted;
      } else {
        todos[todoIndex].dateCompleted = dateCompleted;
      }
      setTodos(todos);
  }

  function onCloseIOSDatePicker() {
    if(!isIOSDateSelected){
        updateTodoDateCompleted(selectedTodo, null)
    }
    setShowDate(false);
    setDate(new Date());
  }
  function onAddNewTodoHandler() {
    setModalVisible(true);
    setIsNewTask(true);
    setSelectedTodo(null);
  }

  function onSaveTodoHandler() {
    if (selectedTodo == null && isNewTask) {
      const todo = new Todo(
        uuid.v4(),
        enteredTask,
        false,
        currentDate(StringConstants.fullDateFormatter)
      );
      setTodos((_todo) => [todo, ...todos]);
    } else {
      const todoIndex = todos.findIndex((_todo) => _todo.id == selectedTodo.id);
      todos[todoIndex].title = enteredTask;
    }
    setSelectedTodo(null);
    setEnteredTask("");
    setModalVisible(!modalVisible);
  }

  function onCloseButtonPressHandler() {
    setSelectedTodo(null);
    setEnteredTask("");
    setModalVisible(!modalVisible);
  }

  function onTodoPressHandler(todo) {
    setSelectedTodo(todo);
    setEnteredTask(todo.title);
    setModalVisible(true);
    setIsNewTask(false);
  }

  function onTodoCompletedHandler(todo) {
    const todoIndex = todos.findIndex((_todo) => _todo.id == todo.id);

    if (todo.isCompleted === false) {
        setShowDate(true);
    }else{
        todos[todoIndex].dateCompleted = null
        if (isIOS) {
            setShowDate(false);
            setDate(new Date());
        }
    }

    todos[todoIndex].isCompleted = !todo.isCompleted;
    setSelectedTodo(todos[todoIndex]);
    setTodos(todos);
  }

  function onTodoDeletedHandler(todoId) {
    Alert.alert(StringConstants.deleteTask, StringConstants.deleteTaskMessage, [
      { text: "No" },
      {
        text: "Yes",
        onPress: () => {
          setSelectedTodo(null);
          setTodos(todos.filter((_todo) => _todo.id != todoId));
        },
      },
    ]);
  }
  function enteredTaskHandler(enteredTask) {
    setEnteredTask(enteredTask);
  }

  return (
    <View style={styles.rootContainer}>
      {renderTodoList()}
      {renderTodoModal()}
      {renderDatePicker()}
      <FloatingButton iconType={"md-add"} onPress={onAddNewTodoHandler} />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "80%",
    height: 190,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  modalHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
  },
  modalTextInput: {
    width: "100%",
    height: 50,
    fontSize: 16,
    borderColor: Colors.gray,
    borderWidth: 2,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  modalCloseButton: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  iosDatePickerCloseBtn: {
    zIndex: 1,
  },
});
