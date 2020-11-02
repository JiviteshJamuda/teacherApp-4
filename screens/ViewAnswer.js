import React from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, ToastAndroid, Button } from "react-native";
import { Header, Card, Icon } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class ViewAnswer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            answer : this.props.navigation.getParam("hand")["answer"],
            assignment_id : this.props.navigation.getParam("hand")["assignment_id"],
            feedback : "",
            docId : this.props.navigation.getParam("id"),
            totalMarks : this.props.navigation.getParam("totalMarks"),
            givenMarks : "",
        }
        this.requestRef = null;
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
                "marks" : this.state.givenMarks
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
                                    "it should not be greater than the total marks",
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
                                    this.submitFeedbackAndMarks()
                                }
                            }
                        }} >
                            <Text style={styles.buttonText}>submit</Text>
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
    buttonText:{
        fontSize:19,
        fontWeight:"bold",
        color:"#c7ea46"
    },
    markBox : {
        borderRadius:10,
        borderWidth:1,
    },
})