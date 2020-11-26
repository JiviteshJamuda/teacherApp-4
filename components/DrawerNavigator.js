import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SideBarMenu  from './SideBarMenu';

import CheckAssignment from "../screens/CheckAssignment";
import PostAssignment from "../screens/PostAssignment";
import NotificationScreen from "../screens/NotificationScreen"

export const DrawerNavigator = createDrawerNavigator(
    {
        CheckAssignments : {screen : CheckAssignment},
        PostAssignments : {screen : PostAssignment},
        NotificationScreen : {screen : NotificationScreen},
    },
    {contentComponent : SideBarMenu},
    {initialRouteName : "PostAssignments"},
)