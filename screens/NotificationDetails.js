import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Button, ScrollView } from "react-native";
import { Header, Card, Icon } from "react-native-elements"
import db from "../config";
import firebase from "firebase";

export default class NotificationDetails extends React.Component {
    constructor(props){
        super(props);
        this.state={
            notificationId : this.props.navigation.getParam("details")["notification_id"],
            feedback : this.props.navigation.getParam("details")["feedback"],
            message : this.props.navigation.getParam("details")["message"],
            docId : "",
        };
        this.requestRef = null;
    }

    markAsRead = ()=>{
        db.collection("all_notifications").doc(this.state.docId).update({
            "notification_status" : "read"
        })
        this.props.navigation.goBack()
    }

    async componentDidMount(){
        this.requestRef = await db.collection("all_notifications").where("notification_id", "==", this.state.notificationId)
        .onSnapshot(snapshot=>{
            snapshot.docs.map(doc=>{
                this.setState({
                    docId : doc.id
                })
            })
        })
    }

    render(){
        return(
            <ScrollView title>
                <Header placement="left"
                    leftComponent={<Icon name="arrow-left" type="font-awesome" onPress={()=>{this.props.navigation.goBack()}} color="yellow"/>}
                    centerComponent={{text:"Details", style:{fontWeight:"bold", fontSize:25, color:"white"}}}
                    backgroundColor="green"
                />
                <Card title={this.state.message} >
                    <Text style={{fontSize:19, fontWeight:"bold"}}>feedback provided : {this.state.feedback}</Text>
                    <TouchableOpacity style={styles.button} 
                    onPress={()=>{
                        this.markAsRead()
                    }}>
                        <Text style={styles.buttonText}>Mark as read</Text>
                    </TouchableOpacity>
                </Card>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        borderWidth:2,
        borderColor:"#c7ea46",
        borderRadius:10,
        height:45,
        width:150,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
    },
    buttonText:{
        fontSize:19,
        fontWeight:"bold",
        color:"#c7ea46"
    },
})