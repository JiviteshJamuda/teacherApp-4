import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { Icon } from "react-native-elements";
import firebase from "firebase";

export default class SideBarMenu extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.drawerItemsContainer}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style={styles.logOutContainer}>
                  <TouchableOpacity
                    onPress={()=>{
                        firebase.auth().signOut(); 
                        this.props.navigation.navigate("Welcome")
                    }}
                  >
                    {/* <Icon
                      name="Log out"
                      type="antdesign"
                      size={20}
                      iconStyle={{paddingLeft:10}}
                    /> */}
                    <Text style={styles.logOutText}>Log out</Text>
                    <Icon name="sign-out" type="font-awesome"/>
                  </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container : {
      flex:1
    },
    drawerItemsContainer:{
      flex:0.8
    },
    logOutContainer : {
      flex:0.2,
      justifyContent:'flex-end',
      // paddingBottom:30
    },
    logOutButton : {
      height:30,
      width:'100%',
      justifyContent:'center',
      padding:10
    },
    logOutText:{
      fontSize: 30,
      fontWeight:'bold'
    },
    // imageContainer: { flex: 0.75, width: "40%", height: "20%", marginLeft: 20, marginTop: 30, borderRadius: 40, },
  
  })
  