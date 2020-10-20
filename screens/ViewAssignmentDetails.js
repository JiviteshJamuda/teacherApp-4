import React from "react";
import { View, Text, StyleSheet, Button, ScrollView  } from "react-native";
import { Header, Icon, Card } from "react-native-elements"
import firebase from "firebase";
import db from "../config";

export default class ViewAssignmentDetails extends React.Component {
    constructor(props){
        super(props);
        this.state={
            docId : "",
            question : this.props.navigation.getParam("details")["question"],
            subject : this.props.navigation.getParam("details")["subject"]
        }
    }   // this.props.navigation.getParam("details")["request_id"],

    render(){
        return(
            <ScrollView style={{flex:1}}>
                <View>
                    <Header
                        leftComponent={<Icon name="arrow-left" type="font-awesome" onPress={()=>{this.props.navigation.goBack()}}/>}
                        placement="left"
                        centerComponent={{text:"Assignment Details", style:{fontSize:25, fontWeight:"bold"}}}
                        backgroundColor="green"
                    />
                </View>
                <View>
                    <Card>
                        <Text style={styles.questionText}>{this.state.question}</Text>
                        <Text>{this.state.subject}</Text>
                    </Card>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    questionText : {
        fontSize:19,
        fontWeight:"bold"
    }
})