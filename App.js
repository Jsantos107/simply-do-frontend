import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Home from './components/Home';
import Login from './components/Login';
import Welcome from './components/Welcome';
import SignUp from './components/SignUp';
import AddList from './components/AddList'

const Stack = createStackNavigator();

let customFonts = { 'Kanit-Regular': require('./assets/fonts/Kanit-Regular.ttf') };
export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
  render() {
    if (this.state.fontsLoaded) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Welcome}/>
          <Stack.Screen name="Login" component={Login}/> 
          <Stack.Screen name="SignUp" component={SignUp}/> 
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="AddList" component={AddList}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return <AppLoading />;
    }
  }
}

