import React, { Component } from 'react';
import axios from 'axios';
import { View, TextInput, StyleSheet, Modal, AsyncStorage, TouchableOpacity, Text, Image } from 'react-native'


export default class AddList extends Component{
    state={
        title: '',
        description: '',
        addItem: false
    };
    cancel = () => {
        this.setState({
            title: '',
            description: ''
        })
        this.props.navigation.navigate('Home')
    };

    render(){
        return( 
            <Modal  animationType='fade'>
                <View style={styles.addContainer}>
                    <Text style={styles.title}> Add list </Text>
                    <TextInput style={styles.input} placeholder="Title"
                    autoCapitalize={"none"}
                    value={this.state.title} onChangeText={(title)=> this.setState({title})}/>

                    <TextInput style={styles.input} placeholder="Description" autoCapitalize={"none"} 
                    value={this.state.description} onChangeText={(description)=> this.setState({description})}/>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={this.cancel} 
                            style={styles.cancelBtn}>
                            <Image style={styles.logo} source={require('../Images/SDCancel.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.newList}
                            style={styles.button}>
                            <Image style={styles.logo} source={require('../Images/SDPlus.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.botContainer} >
                    <View style={styles.navContainer}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Home')}>
                            <Image style={styles.logo} source={require('../Images/SDHome.png')}></Image>
                        </TouchableOpacity>                      
                    </View>
                </View>

            </Modal>
        );
    };

    newList = async() => {
        const ID = await AsyncStorage.getItem('userId')
        if(this.state.title && ID){
            axios.post("https://simply-do-backend.herokuapp.com/lists", {
                title: this.state.title, 
                description: this.state.description,
                done: false,
                user_id: ID
            })
            .then(response => this.AddedList(response.data))
            .catch(error => {
                console.log(error)
                alert("Please Try Again")
            })
        }else{
            alert("Please enter a title")
        };
    };

    AddedList = (data) => {
        data.list.created_at ? this.props.navigation.navigate('Home', {newList: data.list}) : alert("Something went wrong\nPlease try again!")
    };

};
const styles = StyleSheet.create({  
    addContainer:{
        flex: 1,
        justifyContent:'center', 
        alignItems:'center',
    },
    title:{
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
    cancelBtn:{
        alignItems:"center",
        backgroundColor: "#fff",
        padding: 15,
        width:'40%'
    },
    button:{
        alignItems:"center",
        backgroundColor: "#fff",
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
        borderWidth: 3, 
        padding:15, 
        width:'80%',
        marginBottom: 10,
        fontFamily: "K2D-Medium"
    },
    botContainer:{
        width:'100%',
        backgroundColor: '#e7d39f',
        padding: 5,
        borderColor: '#522d5b',
        borderWidth: 3,
        bottom: 0
    }, 
    navContainer:{
        marginBottom: 10,
        width:'95%',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    logo: {
        width: 60,
        height: 65,
    },

 });