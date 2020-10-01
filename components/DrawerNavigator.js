import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SideBarMenu  from './SideBarMenu';

import WelcomeScreen from "../screens/WelcomeScreen";
import CheckAssignment from "../screens/CheckAssignment";
import PostAssignment from "../screens/PostAssignment";

export const DrawerNavigator = createDrawerNavigator(
    {
        CheckAssignments : {screen : CheckAssignment},
        PostAssignments : {screen : PostAssignment},
    },
    {contentComponent : SideBarMenu},
    {initialRouteName : "PostAssignments"},
)