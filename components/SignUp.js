import React, { Component } from 'react';
import axios from 'axios';
import { View, TextInput, StyleSheet, Button, Modal, StatusBar, TouchableOpacity, Text } from 'react-native'


export default class SignUp extends Component{
    state={
        username:'',
        password:'',
    }
    cancel = () => {
        this.setState({
            username: '',
            password: ''
        })
        this.props.navigation.navigate('Welcome')
    }
    
    render(){
        return( 
            <Modal  animationType='slide'>
                <StatusBar backgroundColor='#1e90ff' barStyle='light-content'/>
                <View style={styles.login}>
                    <Text style={styles.welcome}>Sign-up</Text>
                    <TextInput style={styles.input} placeholder="Enter Username"
                    autoCapitalize={"none"}
                    value={this.state.username} onChangeText={(username)=> this.setState({username})}/>

                    <TextInput style={styles.input} placeholder="Enter Password" autoCapitalize={"none"} 
                    value={this.state.password} secureTextEntry={true} onChangeText={(password)=> this.setState({password})}/>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={this.cancel} 
                            style={styles.button}>
                            <Text style={styles.btnText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.signUpUser}
                            style={styles.button}>
                            <Text style={styles.btnText}>SignUp</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };
    signUpUser = async() => {
        if(this.state.username && this.state.password){
            axios.post("https://simply-do-backend.herokuapp.com/users", {
                username: this.state.username, 
                password: this.state.password
            })
            .then(response => this.signedUp(response.data))
            .catch(error => {
                console.log(error)
                alert("Authentication Failed\nPlease Try Again")
            })
        }else{
            alert("Please enter a\nUsername and Password!")
        };
    };

    signedUp = (data) => {
        data.user.created_at ? this.props.navigation.navigate('Login'): alert("Something went wrong\nPlease try again!")
    }

};

const styles = StyleSheet.create({  
    login:{
        flex: 1,
        justifyContent:'center', 
        alignItems:'center',
        backgroundColor:'#e7d39f'
    },
    welcome:{
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        fontFamily: "K2D-Medium"
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: '75%',
    },
    button:{
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "#fb7b6b",
        padding: 15,
        width:'40%'
    },
    btnText:{
        fontSize:18,
        textAlign:'center',
        fontFamily: "K2D-Medium"
    },
    input:{
        borderColor:'black', 
        backgroundColor: '#fff',
        borderWidth: 1, 
        padding:15, 
        width:'80%',
        marginBottom: 10,
        fontFamily: "K2D-Medium"
      }
 });