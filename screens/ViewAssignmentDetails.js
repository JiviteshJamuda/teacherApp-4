import React from "react";
import { View, Text, StyleSheet, Button, ScrollView, FlatList, TouchableOpacity  } from "react-native";
import { Header, Icon, Card, ListItem } from "react-native-elements"
import firebase from "firebase";
import db from "../config";

export default class ViewAssignmentDetails extends React.Component {
    constructor(props){
        super(props);
        this.state={
            docId : "",
            question : this.props.navigation.getParam("details")["question"],
            subject : this.props.navigation.getParam("details")["subject"],
            assignmentId : this.props.navigation.getParam("details")["assignment_id"],
            totalMarks : this.props.navigation.getParam("details")["total_marks"],
            allAnswers : [],
        }
        this.requestRef = null;
    }   // this.props.navigation.getParam("details")["request_id"],

    getAllAnswers = ()=>{
        this.requestRef = db.collection("all_answers").where("assignment_id", "==", this.state.assignmentId)
        .onSnapshot(snapshot=>{
            var allAnswers = snapshot.docs.map(doc=> doc.data())
            this.setState({
                allAnswers : allAnswers,
            })
            snapshot.forEach(doc=>{
                this.setState({
                    docId : doc.id
                })
            })
        })
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item,i}) =>{
        return (
          <ListItem
            key={i}
            title={item.student_name}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            // subtitle={item.subject}
            rightElement={
                <TouchableOpacity style={styles.viewButton}  
                    onPress={()=>{ 
                        this.props.navigation.navigate("ViewAnswer", {details : item, id : this.state.docId, totalMarks : this.state.totalMarks}) 
                    }}
                >
                    <Text style={styles.viewButtonText}>view</Text>
                </TouchableOpacity>
            }
            bottomDivider
          />
        )
    }

    async componentDidMount(){
        await this.getAllAnswers();
    }

    componentWillUnmount(){
        this.requestRef();
    }

    render(){
        return(
            <ScrollView style={{flex:1}}>
                <View>
                    <Header
                        leftComponent={<Icon name="arrow-left" type="font-awesome" onPress={()=>{this.props.navigation.goBack()}} color="yellow" />}
                        placement="left"
                        centerComponent={{text:"Assignment Details", style:{fontSize:25, fontWeight:"bold", color:"white"}}}
                        backgroundColor="green"
                    />
                </View>
                <View>
                    <Card>
                        <Text style={styles.questionText}>{this.state.question}</Text>
                        <Text>{this.state.subject}</Text>
                        <Text>Total Marks : {this.state.totalMarks}</Text>
                    </Card>
                </View>
                {
                    this.state.allAnswers.length === 0 ?
                    (
                        <Card>
                            <Text style={{fontWeight:"bold"}}>Nobody has completed the assignment</Text>
                        </Card>
                    ):
                    (
                        <Card title="List of students who have completed the assignment">
                            <FlatList
                                data={this.state.allAnswers}
                                renderItem={this.renderItem}
                                keyExtractor={this.keyExtractor}
                            />
                        </Card>
                    )
                }
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    questionText : {
        fontSize:19,
        fontWeight:"bold"
    },
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