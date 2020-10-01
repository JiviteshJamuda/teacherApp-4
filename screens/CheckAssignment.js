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
        this.requestRef = db.collection("all_assignments")
        .onSnapshot(snapshot=>{
            var allAssignments = snapshot.docs.map(doc=> doc.data())
            this.setState({
                allAssignments : allAssignments,
            })
        })
    }

    // getRequestedBooksList =()=>{
    //     this.requestRef = db.collection("requested_books")
    //     .onSnapshot((snapshot)=>{
    //       var requestedBooksList = snapshot.docs.map((doc) => doc.data())
    //       this.setState({
    //         requestedBooksList : requestedBooksList
    //       });
    //     })
    //   }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item,i}) =>{
        return (
          <ListItem
            key={i}
            title={item.question}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            subtitle={item.subject}
            bottomDivider
          />
        )
    }

    // renderItem = ( {item, i} ) =>{
    //     return (
    //       <ListItem
    //         key={i}
    //         title={item.book_name}
    //         subtitle={item.reason_to_request}
    //         titleStyle={{ color: 'black', fontWeight: 'bold' }}
    //         leftElement={
    //           <Image
    //             style={{height:50, width:50,}}
    //             source={{uri:item.image_link}}
    //           />
    //         }
    //         rightElement={
    //             <TouchableOpacity style={styles.button}
    //               onPress ={()=>{
    //                 this.props.navigation.navigate("RecieverDetails",{"details": item})
    //               }}
    //               >
    //               <Text style={{color:'#ffff'}}>View</Text>
    //             </TouchableOpacity>
    //           }
    //         bottomDivider
    //       />
    //     )
    //   }

    componentDidMount(){
        this.getTeacherDetails();
        this.getAllAssignments();
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
                    centerComponent={{text:"Check Assignments", style:{fontSize:15, fontWeight:"bold"}}}
                />
                <Button title="press" onPress={()=>{console.log(this.state.allAssignments)}}/>
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