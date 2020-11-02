import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from "react-native";
import { Header, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import RNPickerSelect from "react-native-picker-select";
import { ModalDatePicker } from "react-native-material-date-picker";


export default class PostAssignment extends React.Component {
    constructor(){
        super();
        this.state={
            question : "",
            subject : null,
            dueDate : "",
            teacherName : "",
            emailId : firebase.auth().currentUser.email,
            docId : "",
            totalMarks : "10",
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

    postQuestion = ()=>{
        var question = this.state.question.trim()
        if(this.state.question === "" || this.state.question === " "){
            ToastAndroid.showWithGravityAndOffset(
                "Please enter the question first",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0,
                100
            )
        } else if(this.state.subject === null){
            ToastAndroid.showWithGravityAndOffset(
                "Please select the subject first",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0,
                100
            )
        } else {
            var assignmentId = this.createUniqueId();
            db.collection("all_assignments").add({
                "question" : question,
                "subject" : this.state.subject,
                "teacher_name" : this.state.teacherName,
                "teacher_email_id" : this.state.emailId,
                "assignment_id" : assignmentId,
                "total_marks" : this.state.totalMarks,
            })
            ToastAndroid.showWithGravityAndOffset(
                "Question Posted Successfully!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0,
                100
            )
        }
        
        
    }

    createUniqueId = ()=>{
        return Math.random().toString(36).substring(5)
    }

    componentDidMount(){
        this.getTeacherDetails();
    }

    componentWillUnmount(){
        this.requestRef();
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Header
                    leftComponent={<Icon name="menu" onPress={()=>{this.props.navigation.toggleDrawer()}} color="yellow"/>}
                    placement="left"
                    centerComponent={{text:"Post Assignments", style:{fontSize:25, fontWeight:"bold", color:"white"}}}
                    backgroundColor="green"
                />
                <TextInput style={styles.questionBox}
                    placeholder="type the question or paste a link from drive"
                    onChangeText={(text)=>{ this.setState({ question : text }) }}
                    value={this.state.question}
                    maxLength={9999999999}
                    multiline={true}

                />
                <View style={{flex:1, marginTop:20, alignItems:"center"}}>
                    <Text>Selected Subject : {this.state.subject}</Text>
                    <RNPickerSelect
                        onValueChange={(value) => this.setState({ subject : value })}
                        items={[
                            { label: 'Maths', value: 'maths' },
                            { label: 'English', value: 'english' },
                            { label: 'Science', value: 'science' },
                        ]}
                    />
                    {/* <View style={{flex: 1, alignSelf: 'stretch'}}>
                        <ModalDatePicker
                            button={<Text> Open </Text>}
                            locale="en"
                            onSelect={(date) => console.log(date)}
                            isHideOnSelect={true}
                            initialDate={new Date()}
                        />             
                    </View> */}
                    <Text>Total marks : </Text>
                    <TextInput style={styles.markBox}
                        placeholder="enter total marks"
                        value={this.state.totalMarks}
                        onChangeText={(text)=>{ this.setState({ totalMarks : text }) }}
                        keyboardType="numeric"
                        maxLength={4}
                    />
                    <TouchableOpacity style={styles.button}  onPress={()=>{ this.postQuestion() }}>
                        <Text style={styles.buttonText}>Post</Text>
                    </TouchableOpacity>
                </View>                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    questionBox:{
        borderWidth:2,
        margin:10,
        height:120,
        borderRadius:10,
    },
    button:{
        borderWidth:2,
        borderColor:"#c7ea46",
        borderRadius:10,
        height:45,
        width:100,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
    },
    buttonText:{
        fontSize:19,
        fontWeight:"bold",
        color:"#c7ea46"
    },
    markBox:{
        borderWidth:1,
        borderRadius:5,
        marginTop:10,
    }
})