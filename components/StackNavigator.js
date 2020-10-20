import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import CheckAssignment from "../screens/CheckAssignment";
import ViewAssignmentDetails from "../screens/ViewAssignmentDetails";
import { DrawerNavigator } from "./DrawerNavigator";

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
  }
},
  {
    initialRouteName: 'Home'
  },
);
