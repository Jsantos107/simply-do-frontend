import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Home from './components/Home';
import Login from './components/Login';
import Welcome from './components/Welcome';
import SignUp from './components/SignUp';

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
          <Stack.Screen 
          name="Home"
          component={Home} 
          options={{
            headerTitle: "header",
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="blue"
              />
            ),
          }}  />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return <AppLoading />;
    }
  }
}

