import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import {DrawerNavigator} from "./components/DrawerNavigator";
import WelcomeScreen from "./screens/WelcomeScreen";

export default class App extends React.Component {
  render(){
    return(
        <AppContainer/>
    )
  }
}

const SwitchNavigator = createSwitchNavigator({
  Welcome : {screen : WelcomeScreen},
  Drawer : {screen : DrawerNavigator},
})

const AppContainer = createAppContainer(SwitchNavigator)
