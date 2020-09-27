import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Header, Icon } from "react-native-elements";

export default class CheckAssignment extends React.Component {
    render(){
        return(
            <View>
                <Header
                    leftComponent={<Icon name="menu" onPress={()=>{this.props.navigation.toggleDrawer()}}/>}
                    placement="left"
                    centerComponent={{text:"Check Assignments", style:{fontSize:15, fontWeight:"bold"}}}
                />
            </View>
        )
    }
}