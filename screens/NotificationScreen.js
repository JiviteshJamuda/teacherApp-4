import React, { Component } from 'react';
import { StyleSheet, View, FlatList,Text, Button, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import SwipeableFlatlist from "../components/SwipeableFlatlist";
import db from '../config';

export default class NotificationScreen extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      userId :  firebase.auth().currentUser.email,
      allNotifications : []
    };
    this.requestRef = null
  }

  getNotifications=()=>{
    this.requestRef = db.collection("all_notifications")
    .where("notification_status", "==", "unread")
    .where("targeted_user_id",'==',this.state.userId)
    .onSnapshot((snapshot)=>{
      var allNotifications =  []
      snapshot.docs.map((doc) =>{
        var notification = doc.data()
        notification["doc_id"] = doc.id
        allNotifications.push(notification)
      });
      this.setState({
          allNotifications : allNotifications
      });
    })
  }

  async componentDidMount(){
    await this.getNotifications()
  }

  componentWillUnmount(){
    this.requestRef()
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item,i}) =>{
    return (
      <ListItem
        key={i}
        title={item.message}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.viewButton}  onPress={()=>{ this.props.navigation.navigate("NotificationDetails", {details : item}) }}>
                <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
        }
        bottomDivider
      />
    )
  }


  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <MyHeader title={"Notifications"} navigation={this.props.navigation}/>
        </View>
        <View style={{flex:0.9}}>
          {
            this.state.allNotifications.length === 0
            ?(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25}}>You have no notifications</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                data={this.state.allNotifications}
              />
            )
          }
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container : {
    flex : 1
  },
  viewButton : {
    borderWidth:2,
    height:30,
    width:60,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5,
    borderColor:"#c7ea46",
  },
  viewButtonText : {
    fontWeight:"bold",
    fontSize:15,
    color:"#c7ea46"
  },
})
