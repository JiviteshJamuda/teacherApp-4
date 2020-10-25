import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import CheckAssignment from "../screens/CheckAssignment";
import ViewAssignmentDetails from "../screens/ViewAssignmentDetails";
import { DrawerNavigator } from "./DrawerNavigator";
import ViewAnswer from "../screens/ViewAnswer";

export const StackNavigator = createStackNavigator({
  Home : {
    screen : DrawerNavigator,
    navigationOptions:{
      headerShown : false
    }
  },
  ViewAssignmentDetails : {
    screen : ViewAssignmentDetails,
    navigationOptions:{
      headerShown : false
    }
  },
  ViewAnswer : {
    screen : ViewAnswer,
    navigationOptions :{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'Home'
  },
);
