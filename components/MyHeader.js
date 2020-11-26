import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from "../config";
import firebase from "firebase"

export default class MyHeader extends React.Component {
  constructor(props){
    super(props)
    this.state={
      value:"",
      emailId : firebase.auth().currentUser.email,
    };
  }

  // getNumberOfUnreadNotifications = ()=>{
  //   db.collection("all_notifications").where("targeted_user_id","==",this.state.emailId).where("notification_status", "==", "unread").onSnapshot(snapshot=>{
  //     var unreadNotifications = snapshot.docs.map(doc=>{
  //       doc.data()
  //     })
  //     this.setState({
  //       value : unreadNotifications.length
  //     })
  //   })
  // }

  // componentDidMount(){
  //   this.getNumberOfUnreadNotifications();
  // }

  // BellIconWithBadge=()=>{
  //   return(
  //     <View>
  //       <Icon name='bell' type='font-awesome' color='#696969' size={25}
  //         onPress={() =>this.props.navigation.navigate('Notification')}/>
  //        <Badge
  //         value={this.state.value}
  //        containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
  //     </View>
  //   )
  // }

  render(){
    return (
      <Header
        leftComponent={<Icon name='bars' type='font-awesome' color='white'  onPress={() => this.props.navigation.toggleDrawer()}/>}
        centerComponent={{ text: this.props.title, style: { color: "white", fontSize:25,fontWeight:"bold", } }}
        // rightComponent={<this.BellIconWithBadge {...this.props}/>}
        backgroundColor = "green"
        placement="left"
      />
    )
  }
  
    
}

