import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Header, Icon } from "react-native-elements";

export default class PostAssignment extends React.Component {
    render(){
        return(
            <Header
                    leftComponent={<Icon name="menu" onPress={()=>{this.props.navigation.toggleDrawer()}}/>}
                    placement="left"
                    centerComponent={{text:"Post Assignments", style:{fontSize:15, fontWeight:"bold"}}}
            />
        )
    }
}