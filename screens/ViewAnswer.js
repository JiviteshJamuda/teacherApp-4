import React from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, ToastAndroid, Button } from "react-native";
import { Header, Card, Icon } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class ViewAnswer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            answer : this.props.navigation.getParam("details")["answer"],
            assignment_id : this.props.navigation.getParam("details")["assignment_id"],
            feedback : "",
            docId : this.props.navigation.getParam("id"),
            totalMarks : this.props.navigation.getParam("totalMarks"),
            givenMarks : "",
            studentEmailId : this.props.navigation.getParam("details")["student_email_id"],
            senderName :"",
            recievedMarksOfStudent : "",
            totalMarksOfStudent : "",
            studentDocId : "",
            question : this.props.navigation.getParam("question"),
        }
        this.requestRef = null;
    }

    getSenderName = ()=>{
        this.requestRef = db.collection("all_assignments").where("assignment_id", "==", this.state.assignment_id)
        .onSnapshot(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({ senderName : doc.data().teacher_name })
            })
        })
    }

    createUniqueId = ()=>{
        return Math.random().toString(36).substring(5)
    }

    sendNotification = ()=>{
        var notificationId = this.createUniqueId()
        db.collection("all_notifications").add({
            "notification_id" : notificationId,
            "targeted_user_id" : this.state.studentEmailId,
            "notification_status" : "unread",
            "message" : this.state.senderName + " has marked your answer",
            "feedback" : this.state.feedback,
            "question" : this.state.question,
        })
    }

    sendNotificationToResubmit = ()=>{
        var notificationId = this.createUniqueId()
        db.collection("all_notifications").add({
            "notification_id" : notificationId,
            "targeted_user_id" : this.state.studentEmailId,
            "notification_status" : "unread",
            "message" : this.state.senderName + " has asked you to resubmit your answer for the assignment",
            "feedback" : this.state.feedback,
            "question" : this.state.question,
        })
    }

    updateStuentMarks = async(givenMarks, totalMarks)=>{
        var recievedMark = parseInt(this.state.recievedMarksOfStudent)
        var totalMark = parseInt(this.state.totalMarksOfStudent)

        var addRecievedMarks = parseInt(givenMarks)
        var addTotalMarks = parseInt(totalMarks)

        var num1 = recievedMark + addRecievedMarks
        var num2 = totalMark + addTotalMarks
        await db.collection("users").doc(this.state.studentDocId).update({
            "recieved_marks" : num1,
            "total_marks" : num2,
        })
    }

    submitFeedbackAndMarks = ()=>{
        if(this.state.feedback === "" || this.state.feedback === " "){
            ToastAndroid.showWithGravityAndOffset(
                "Please enter the feedback",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0,
                100
            )
        } else {
            db.collection("all_answers").doc(this.state.docId)
            .update({
                "feedback" : this.state.feedback,
                "marks" : this.state.givenMarks,
            })
            ToastAndroid.showWithGravityAndOffset(
                "Marks and Feedback Submitted successfully",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0, 
                100
            )
        }
    }

    askToResubmit = ()=>{
        if(this.state.feedback === "" || this.state.feedback === " "){
            ToastAndroid.showWithGravityAndOffset(
                "Please enter the feedback",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0,
                100
            )
        } else {
            db.collection("all_answers").doc(this.state.docId)
            .update({
                "feedback" : this.state.feedback,
            })
            ToastAndroid.showWithGravityAndOffset(
                "Feedback Submitted successfully",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0, 
                100
            )
        }
    }

    async componentDidMount(){
        await this.getSenderName();
        this.requestRef = await db.collection("users").where("email_id", "==", this.state.studentEmailId).onSnapshot(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    recievedMarksOfStudent : doc.data().recieved_marks,
                    totalMarksOfStudent : doc.data().total_marks,
                    studentDocId : doc.id
                })
            })
        })
    }

    componentWillUnmount(){
        this.requestRef();
    }

    render(){
        return(
            <View>
                <Header placement="left"
                    leftComponent={<Icon name="arrow-left" type="font-awesome" onPress={()=>{this.props.navigation.goBack()}} color="yellow"/>}
                    centerComponent={{text:"View Answer", style:{fontWeight:"bold", fontSize:25, color:"white"}}}
                    backgroundColor="green"
                />
                <Card>
                    <Text>{this.state.answer}</Text>
                </Card>
                <Card title="Provide Feedback and Marks">
                    <TextInput style={styles.feedbackBox}
                        value={this.state.feedback}
                        placeholder="type here for feedback..."
                        onChangeText={(text)=>{ this.setState({ feedback : text }) }}
                        maxLength={9999999999}
                        multiline
                    />
                    <View style={{justifyContent:"center", alignItems:"center"}}>
                        <Text>total marks out of : {this.state.totalMarks}</Text>
                        <TextInput style={styles.markBox}
                            keyboardType="numeric"
                            maxLength={4}
                            value={this.state.givenMarks}
                            placeholder="give marks.."
                            onChangeText={(text)=>{ this.setState({ givenMarks : text }) }}
                        />
                    </View>
                    <View style={{alignItems:"center"}}>
                        <TouchableOpacity style={styles.button} onPress={()=>{
                            var num1 = parseInt(this.state.totalMarks);
                            var num2 = parseInt(this.state.givenMarks);
                            if(num1 < num2){
                                ToastAndroid.showWithGravityAndOffset(
                                    "given marks should not be greater than the total marks",
                                    ToastAndroid.LONG,
                                    ToastAndroid.BOTTOM,
                                    0, 
                                    100
                                )
                            } else {
                                if(this.state.givenMarks === "" || this.state.givenMarks === " " || this.state.givenMarks === "  " || this.state.givenMarks === "   " || this.state.givenMarks === "    "){
                                    ToastAndroid.showWithGravityAndOffset(
                                        "marks cannot be empty",
                                        ToastAndroid.LONG,
                                        ToastAndroid.BOTTOM,
                                        0,
                                        100
                                    )
                                } else {
                                    this.submitFeedbackAndMarks();
                                    this.sendNotification();
                                    this.updateStuentMarks(this.state.givenMarks, this.state.totalMarks)
                                }
                            }
                        }} >
                            <Text style={styles.buttonText}>submit</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.button2} onPress={()=>{
                            this.askToResubmit();
                            this.sendNotificationToResubmit();
                        }}>
                            <Text style={styles.buttonText2}>Ask to resubmit</Text>
                        </TouchableOpacity>
                    </View>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    feedbackBox:{
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
        marginTop:10,
    },
    button2:{
        borderWidth:2,
        borderColor:"orange",
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
    buttonText2:{
        fontSize:19,
        fontWeight:"bold",
        color:"orange"
    },
    markBox : {
        borderRadius:10,
        borderWidth:1,
    },
})