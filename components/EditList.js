import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Modal, TouchableOpacity, Text, Image, Alert } from 'react-native'


export default class editList extends Component{
    state= {
        title: this.props.list.title,
        description: this.props.list.description,
        done: this.props.list.done
    };
    submitList = () => {
        fetch(`https://simply-do-backend.herokuapp.com/lists/${this.props.list.id}`, {
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                done: this.state.done
            })
        })
        .then(alert('Your list has been changed!'))
        .then(this.props.goHome)
        .catch(error => {
            console.log(error)
            alert("Something went wrong please try again!")
        })
    };
    deleteList = () => {
        fetch(`https://simply-do-backend.herokuapp.com/lists/${this.props.list.id}`, {
            method: "DELETE"
        })
        .then(alert('Your list has been deleted!'))
        .then(this.props.goHome)
        .catch(error => {
            console.log(error)
            alert("Something went wrong please try again!")
        })
      }
    checkingReady = () =>{
        Alert.alert(
            "Are you sure you are done editing?",
            "",
            [
            {
                text: "Cancel",
            },
            {
                text: "No",
                style: "cancel"
            },
            { text: "Yes", onPress: () => this.submitList() }
            ],
            { cancelable: false }
        );
    }
    areYouSure = () =>{
        Alert.alert(
            "Are you sure you would like to delete?",
            "",
            [
            {
                text: "Cancel",
            },
            {
                text: "No",
                style: "cancel"
            },
            { text: "Yes", onPress: () => this.deleteList() }
            ],
            { cancelable: false }
        );
    }

    render(){
        return( 
            <Modal visible={this.props.visible} animationType='fade'>
                <View style={styles.addContainer}>
                    <Text style={styles.title}> Edit List </Text>
                    <View style={styles.listTitleView}>
                        <Text style={styles.listTitle}>Title:</Text>
                        <TextInput style={styles.input}
                        autoCapitalize={"none"}
                        value={this.state.title} onChangeText={(title)=> this.setState({title})}/>
                    </View>
                    <View style={styles.listDescriptionView}>
                        <Text style={styles.listDescription}>Description:</Text>
                        <TextInput style={styles.input} placeholder="Description" autoCapitalize={"none"} 
                        value={this.state.description} onChangeText={(description)=> this.setState({description})}/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={this.areYouSure} 
                            style={styles.cancelBtn}>
                            <Image style={styles.logo} source={require('../Images/SDCancel.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.checkingReady}
                            style={styles.button}>
                            <Image style={styles.logo} source={require('../Images/SDLogo.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.botContainer} >
                    <View style={styles.navContainer}>
                        <TouchableOpacity
                            onPress={this.props.goHome}>
                            <Image style={styles.logo} source={require('../Images/SDHome.png')}></Image>
                        </TouchableOpacity>                      
                    </View>
                </View>

            </Modal>
        );
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
    input:{
        borderColor:'black', 
        backgroundColor: '#fff',
        borderWidth: 3, 
        padding:15, 
        width:'95%',
        marginBottom: 10,
        fontFamily: "K2D-Medium",
        alignSelf:'center'
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
    listDescription:{
        fontSize: 25,
        margin: 15,
        fontFamily: "K2D-Medium"
    },
    listDescriptionView:{
        flexDirection:'column',
        width:'100%',
        alignSelf:'flex-start'
    },
    listTitleView:{
        flexDirection:'column',
        width:'100%',
        alignSelf:'flex-start'
    },
    listTitle:{
        fontSize: 25,
        margin: 15,
        fontFamily: "K2D-Medium"
    },

 });