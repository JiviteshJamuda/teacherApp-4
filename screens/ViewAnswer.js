import React from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, ToastAndroid } from "react-native";
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
            docId : this.props.navigation.getParam("id")
        }
        this.requestRef = null;
    }

    submitFeedback = ()=>{
        if(this.state.feedback === "" || this.state.feedback === " "){
            ToastAndroid.showWithGravityAndOffset(
                "Please enter the feedback",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0,
                100
            )
        }
        db.collection("all_answers").doc(this.state.docId)
        .update({
            "feedback" : this.state.feedback
        })
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
                <Card title="Provide Feedback">
                    <TextInput style={styles.feedbackBox}
                        value={this.state.feedback}
                        placeholder="type here..."
                        onChangeText={(text)=>{ this.setState({ feedback : text }) }}
                        maxLength={9999999999}
                        multiline
                    />
                    <View style={{alignItems:"center"}}>
                        <TouchableOpacity style={styles.button} onPress={()=>{ this.submitFeedback() }} >
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
        marginTop:10,
    },
    buttonText:{
        fontSize:19,
        fontWeight:"bold",
        color:"#c7ea46"
    }
})