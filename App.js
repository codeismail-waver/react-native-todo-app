import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StringConstants from './util/StringConstants';
import Colors from './util/Colors';
import HomeScreen from './screens/HomeScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  
  return (<>
  <StatusBar style='auto'/>
  <NavigationContainer>
    <Stack.Navigator screenOptions={
      {
        headerStyle: {backgroundColor: Colors.primary800 },
        headerTintColor: Colors.white
      }
    }> 
      <Stack.Screen name={StringConstants.homeScreen} component={HomeScreen} options={
        {
          title: StringConstants.homeTitle
        }
      } />
    </Stack.Navigator>
  </NavigationContainer>
  </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
