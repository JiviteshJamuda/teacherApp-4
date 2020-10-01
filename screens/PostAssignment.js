import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Header, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import { Picker } from "@react-native-community/picker";

export default class PostAssignment extends React.Component {
    constructor(){
        super();
        this.state={
            question : "",
            subject : "maths",
            dueDate : "",
            teacherName : "",
            emailId : firebase.auth().currentUser.email,
            docId : "",
        }
        this.requestRef = null
    }

    getTeacherDetails = async()=>{
        await db.collection("users").where("email_id", "==", this.state.emailId)
        .onSnapshot(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    teacherName : doc.data().first_name + " " + doc.data().last_name,
                    docId : doc.id
                })
            })
        })
    }

    postQuestion = ()=>{
        db.collection("all_assignments").add({
            "question" : this.state.question,
            "teacher_name" : this.state.teacherName,
            "subject" : this.state.subject,
        })
    }

    componentDidMount(){
        this.getTeacherDetails();
    }

    // componentWillUnmount(){
    //     this.requestRef();
    // }

    render(){
        return(
            <View style={{flex:1}}>
                <Header
                    leftComponent={<Icon name="menu" onPress={()=>{this.props.navigation.toggleDrawer()}}/>}
                    placement="left"
                    centerComponent={{text:"Post Assignments", style:{fontSize:15, fontWeight:"bold"}}}
                />
                <TextInput
                    placeholder="type the question or paste a link from drive"
                    onChangeText={(text)=>{ this.setState({ question : text }) }}
                    value={this.state.question}
                />
                <TouchableOpacity>
                    <Text onPress={()=>{ this.postQuestion(); }}>Post</Text>
                </TouchableOpacity>
                <Picker
                    style={styles.picker} itemStyle={styles.pickerItem}
                    selectedValue={this.state.subject}
                    onValueChange={(itemValue) => this.setState({subject: itemValue})}
                >
                    <View style={styles.pickerView}>
                        <Picker.Item label="Maths" value="maths" />
                        <Picker.Item label="English" value="english" />
                        <Picker.Item label="Science" value="science" />
                        <Picker.Item label="Hindi" value="hindi" />
                        <Picker.Item label="Geography" value="geography" />
                        <Picker.Item label="History" value="history" />
                    </View>
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    picker: {
       width: 200,
       backgroundColor: '#FFF0E0',
       borderColor: 'black',
       borderWidth: 1,
    },
    pickerView:{
      height:400,    
    },
    pickerItem: {
      color: 'red'
    },
})