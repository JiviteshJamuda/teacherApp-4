import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Button } from "react-native";
import { Header, Icon, ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";

export default class CheckAssignment extends React.Component {
    constructor(){
        super();
        this.state={
            allAssignments : [],
            emailId : firebase.auth().currentUser.email,
            teacherName : "",
            docId : "",
        }
        this.requestRef = null;
    }

    getTeacherDetails = ()=>{
        this.requestRef = db.collection("users").where("email_id", "==", this.state.emailId)
        .onSnapshot(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    teacherName : doc.data().first_name + " " + doc.data().last_name,
                    docId : doc.id
                })
            })
        })
    }

    getAllAssignments = ()=>{
        this.requestRef = db.collection("all_assignments").where("teacher_email_id", "==", this.state.emailId)
        .onSnapshot(snapshot=>{
            var allAssignments = snapshot.docs.map(doc=> doc.data())
            this.setState({
                allAssignments : allAssignments,
            })
        })
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item,i}) =>{
        return (
          <ListItem
            key={i}
            title={item.question}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            subtitle={item.subject}
            rightElement={
                <TouchableOpacity style={styles.viewButton}  onPress={()=>{ this.props.navigation.navigate("ViewAssignmentDetails", {details : item}) }}>
                    <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
            }
            bottomDivider
          />
        )
    }

    async componentDidMount(){
        await this.getTeacherDetails();
        await this.getAllAssignments();
    }

    componentWillUnmount(){
        this.requestRef = null;
    }

    render(){
        return(
            <View>
                <Header
                    leftComponent={<Icon name="menu" onPress={()=>{this.props.navigation.toggleDrawer()}}/>}
                    placement="left"
                    centerComponent={{text:"Check Assignments", style:{fontSize:25, fontWeight:"bold"}}}
                    backgroundColor="green"
                />
                {
                    this.state.allAssignments.length === 0
                    ?(
                        <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:20}}>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>You have not posted any assignments</Text>
                        </View> 
                    )
                    :(
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.allAssignments}
                            renderItem={this.renderItem}    
                        />
                    )
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    }
})