import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, TextInput, Alert, Button } from "react-native";
import { Picker } from "@react-native-community/picker";
import db from "../config";
import firebase from "firebase";
import { Header } from "react-native-elements";

export default class WelcomeScreen extends React.Component {
    constructor(){
        super();
        this.state={
          emailId:'',
          password:'',
          firstName:'',
          lastName:'',
          address:'',
          contact:'',
          confirmPassword:'',
          isModalVisible:'false',
        }
      }
    
      userSignUp = (emailId, password,confirmPassword) =>{
       if(password !== confirmPassword){
           return Alert.alert("password doesn't match\nCheck your password.")
       }else{
         firebase.auth().createUserWithEmailAndPassword(emailId, password)
         .then(()=>{
           db.collection('users').add({
             first_name: this.state.firstName,
             last_name : this.state.lastName,
             contact   : this.state.contact,
             email_id  : this.state.emailId,
             user_type : "teacher",
           })
           return  Alert.alert(
                'User Added Successfully',
                '',
                [
                  {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                ]
            );
         })
         .catch((error)=> {
           // Handle Errors here.
           var errorCode = error.code;
           var errorMessage = error.message;
           return Alert.alert(errorMessage)
         });
       }
     }
    
    userLogin = (emailId, password)=>{
       firebase.auth().signInWithEmailAndPassword(emailId, password)
       .then(()=>{
         this.props.navigation.navigate('Drawer')
       })
       .catch((error)=> {
         var errorCode = error.code;
         var errorMessage = error.message;
         return Alert.alert(errorMessage)
       })
     }
    
    showModal = ()=>{
      return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
        >
        <View style={styles.modalContainer}>
          <ScrollView style={{width:'100%'}}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
            <Text
              style={styles.modalTitle}
              >Registration</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder ={"First Name"}
              maxLength ={8}
              onChangeText={(text)=>{
                this.setState({
                  firstName: text
                })
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Last Name"}
              maxLength ={8}
              onChangeText={(text)=>{
                this.setState({
                  lastName: text
                })
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Contact"}
              maxLength ={10}
              keyboardType={'numeric'}
              onChangeText={(text)=>{
                this.setState({
                  contact: text
                })
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Email"}
              keyboardType ={'email-address'}
              onChangeText={(text)=>{
                this.setState({
                  emailId: text
                })
              }}
            /><TextInput
              style={styles.formTextInput}
              placeholder ={"Password"}
              secureTextEntry = {true}
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            /><TextInput
              style={styles.formTextInput}
              placeholder ={"Confrim Password"}
              secureTextEntry = {true}
              onChangeText={(text)=>{
                this.setState({
                  confirmPassword: text
                })
              }}
            />
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={()=>
                  this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                }
              >
              <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={()=>this.setState({"isModalVisible":false})}
              >
              <Text style={{color:'#c7ea46'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    )
    }

    render(){
        return(
            <ScrollView>
            <KeyboardAvoidingView behavior="padding">
            <View style={styles.container}>
                {this.showModal()}
                <Header
                    centerComponent={{text:"Assignments", style:{fontSize:25, fontWeight:"bold",color:"white", alignItems:"center", justifyContent:"center"}}}
                />
                <TextInput  style={styles.loginBox}
                    placeholder="email ID"
                    onChangeText={(text)=>{this.setState({emailId : text})}}
                    value={this.state.emailId}
                />
                <TextInput style={styles.loginBox}
                    placeholder="password"
                    onChangeText={(text)=>{this.setState({password : text})}}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button}
                    onPress={()=>{this.userLogin(this.state.emailId, this.state.password)}}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={()=>{this.setState({isModalVisible:true})}}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
      flex:1,
      alignItems:"center",
      padding:30,
    },
   profileContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   },
   title :{
     fontSize:65,
     fontWeight:'300',
     paddingBottom:30,
     color : '#c7ea46'
   },
   loginBox:{
     width: 300,
     height: 40,
     borderBottomWidth: 1.5,
     borderColor : '#c7ea46',
     fontSize: 20,
     margin:10,
     paddingLeft:10
   },
   KeyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center'
   },
   modalTitle :{
     justifyContent:'center',
     alignSelf:'center',
     fontSize:30,
     color:'#c7ea46',
     margin:50
   },
   modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ffff",
     marginRight:30,
     marginLeft : 30,
     marginTop:80,
     marginBottom:80,
   },
   formTextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#c7ea46',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
   },
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30
   },
   registerButtonText:{
     color:'#c7ea46',
     fontSize:15,
     fontWeight:'bold'
   },
   cancelButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:5,
   },
  
   button:{
    borderRadius:30,
    marginTop:30,
    width:100,
    height:35,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#c7ea46",
  },
  buttonText:{
    fontSize:20,
    fontWeight:"bold",
    color:"grey",
  },
   fadeViewText : {
        fontSize:32,
        fontWeight:"bold",
      },
  })
  