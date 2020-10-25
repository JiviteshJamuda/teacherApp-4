import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
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
            subject : "maths",
            dueDate : "",
            teacherName : "",
            emailId : firebase.auth().currentUser.email,
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

    postQuestion = ()=>{
        var assignmentId = this.createUniqueId();
        db.collection("all_assignments").add({
            "question" : this.state.question,
            "subject" : this.state.subject,
            "teacher_name" : this.state.teacherName,
            "teacher_email_id" : this.state.emailId,
            "assignment_id" : assignmentId,
        })
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
                    <RNPickerSelect
                        onValueChange={(value) => this.setState({ subject : value })}
                        items={[
                            { label: 'Maths', value: 'maths' },
                            { label: 'English', value: 'english' },
                            { label: 'Science', value: 'science' },
                        ]}
                    />
                    <Text>Selected Subject : {this.state.subject}</Text>
                    {/* <View style={{flex: 1, alignSelf: 'stretch'}}>
                        <ModalDatePicker
                            button={<Text> Open </Text>}
                            locale="en"
                            onSelect={(date) => console.log(date)}
                            isHideOnSelect={true}
                            initialDate={new Date()}
                        />             
                    </View> */}
                    <TouchableOpacity style={styles.button}  onPress={()=>{ this.postQuestion() }}>
                        <Text style={styles.buttonText}>Post</Text>
                    </TouchableOpacity>
                </View>                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // picker: {
    //    width: 200,
    //    backgroundColor: '#FFF0E0',
    //    borderColor: 'black',
    //    borderWidth: 1,
    // },
    // pickerView:{
    //   height:400,    
    // },
    // pickerItem: {
    //   color: 'red'
    // },
    questionBox:{
        borderWidth:2,
        margin:10,
        height:120
    },
    button:{
        borderWidth:2,
        borderColor:"#c7ea46",
        borderRadius:10,
        height:45,
        width:100,
        alignItems:"center",
        justifyContent:"center",
        marginTop:50,
    },
    buttonText:{
        fontSize:19,
        fontWeight:"bold",
        color:"#c7ea46"
    }
})