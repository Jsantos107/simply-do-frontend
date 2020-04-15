import React, { Component } from 'react';
import axios from 'axios';
import { View, TextInput, StyleSheet, Button, Modal, AsyncStorage, StatusBar, TouchableOpacity, Text } from 'react-native'
import Home from './Home';


export default class Login extends Component{
    state={
        username:'',
        password:'',
    };
    cancel = () => {
        this.setState({
            username: '',
            password: ''
        })
        this.props.navigation.navigate('Welcome')
    };
    
    render(){
        return( 
            <Modal  animationType='slide'>
                <StatusBar backgroundColor='#1e90ff' barStyle='light-content'/>
                <View style={styles.login}>
                    <Text style={styles.welcome}>Login and Simply Do</Text>
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
                            onPress={this.login}
                            style={styles.button}>
                            <Text style={styles.btnText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };
    login = async() => {
        if(this.state.username && this.state.password){
            axios.post("https://simply-do-backend.herokuapp.com/login", {
                username: this.state.username, 
                password: this.state.password
            })
            .then(response => this.tokenData(response.data))
            .then(async () => { this.log() })
            .catch(error => {
                console.log(error)
                alert("Username or password are incorrect!")
            })
        }else{
            alert('Username or password are incorrect!')
        };
    };

    tokenData = async(data) =>{
        await AsyncStorage.setItem('token', data.token)
    };

    log = async() => {
        await AsyncStorage.getItem('token') ? this.userInfo() : alert("Please Try Again")
    };

    userInfo = async () => {
        const token = await AsyncStorage.getItem('token')

        axios.get("https://simply-do-backend.herokuapp.com/users", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              } 
        })
        .then(async (response) => this.userData(response.data))
        .then( this.directHome() )
        .catch(error => {
            console.log(error)
            alert("Something went wrong please try again!")
            this.props.navigation.navigate('Welcome')
        });
    };
    directHome = () => {
        this.props.navigation.navigate('Home')
    };
    userData = async(data) =>{
        try {
            await AsyncStorage.setItem('userId', JSON.stringify(data.user.id))
            await AsyncStorage.setItem('username', data.user.username)
          } catch (error) {
            console.log(error)
            alert('Something went wrong please try again!')
            this.props.navigation.navigate('Welcome')
          };
    };
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