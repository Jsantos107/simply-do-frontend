import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet, Modal, TouchableOpacity, Text, Image, FlatList, Alert } from 'react-native'
import ItemList from './ItemList'

export default class LookAtList extends Component{
    deleteList = (id) => {
        fetch(`https://simply-do-backend.herokuapp.com/lists/${id}`, {
            method: "DELETE"
        })
        .then(alert('Your list has been deleted!'))   
        .catch(error => {
            console.log(error)
            alert("Something went wrong please try again!")
        })
      }
    checkList = (info) => {
        fetch(`https://simply-do-backend.herokuapp.com/lists/${info.id}`, {
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: info.title,
                description: info.description,
                done: true
            })
        })
        .then(alert('Your list has been checked'))
        .catch(error => {
            console.log(error)
            alert("Something went wrong please try again!")
        })
    }
    areYouSure = (id) =>{
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
            { text: "Yes", onPress: () => this.deleteList(id) }
            ],
            { cancelable: false }
        );
    }
    checking = (info) =>{
        Alert.alert(
            "Are you sure you would like to check?",
            "",
            [
            {
                text: "Cancel",
            },
            {
                text: "No",
                style: "cancel"
            },
            { text: "Yes", onPress: () => this.checkList(info) }
            ],
            { cancelable: false }
        );
    }

    render(){
        let checked;
        if(this.props.info.done === true){
            checked = <Image style={styles.checkedLogo} source={require('../Images/SDLogo.png')}></Image>
        }else{
            checked = <Image style={styles.logo} source={require('../Images/SDCircle.png')}></Image>
        }
        return( 
            <Modal visible={this.props.visible}  animationType='fade'>
                <View>
                    <View style={styles.listItem}>
                        <View style={styles.imageContainer}>
                            <TouchableOpacity
                                onPress={() => this.checking(this.props.info)}>
                                    {checked}
                            </TouchableOpacity>   
                        </View>
                            <Text style={styles.listText}>{this.props.info.title}</Text>
                        <View style={styles.imageContainer}>
                            <TouchableOpacity
                                onPress={() => this.props.edit(true)}>
                                <Image style={styles.editLogo} source={require('../Images/SDEdit.png')}></Image>
                            </TouchableOpacity> 
                        </View>
                    </View> 
                </View> 
                <View style={styles.listDescription}>
                    <Text style={styles.listDText}> Description: </Text>
                    <Text style={styles.listDInro}> {this.props.info.description}</Text>
                </View>

                <View>
                    <Text style={styles.itemIntro}>Items:</Text>
                    <FlatList
                     data={this.props.info.items}
                     renderItem={itemData => <ItemList item={itemData.item}/> }
                     keyExtractor={itemData => itemData.id}/> 
                </View>
                <View style={styles.itemContainer} > 
                    <TouchableOpacity
                    onPress={() => alert('hit')}>
                        <View style={styles.itemView}>
                            <Text style={styles.itemText}> Add Item</Text>
                        </View>
                    </TouchableOpacity>                      
                </View>
                <View style={styles.deleteContainer} > 
                    <TouchableOpacity
                    onPress={() =>{ this.areYouSure(this.props.info.id)}}>
                        <View style={styles.deleteView}>
                            <Text style={styles.deleteText}> Delete List</Text>
                        </View>
                    </TouchableOpacity>                      
                </View>
                <View style={styles.botContainer} >
                    <View style={styles.navContainer}>
                        <TouchableOpacity
                            onPress={this.props.goHome}>
                            <Image style={styles.homeLogo} source={require('../Images/SDHome.png')}></Image>
                        </TouchableOpacity>                      
                    </View>
                </View>



            </Modal>
        );
    };
};
const styles = StyleSheet.create({  
    listItem:{
        padding: 10,
        backgroundColor: '#e7d39f',
        borderColor: '#522d5b',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
    },
    listText:{
        paddingLeft: 10,
        fontFamily: "Kanit-Regular",
        fontSize: 25
    },
    listDescription:{
        padding: 10,
        borderColor: '#522d5b',
        borderBottomWidth: 5,
        flexDirection: 'row',
        alignItems:'center',
        width:'100%',
    },
    listDInro:{
        fontFamily: "Kanit-Regular",
        fontSize: 20
    },
    listDText:{
        fontFamily: "Kanit-Regular",
        fontSize: 25
    },
    itemIntro:{
        paddingLeft: 10,
        fontFamily: "Kanit-Regular",
        fontSize: 25
    },
    logo: {
        width: 50,
        height: 50
    },
    editLogo: {
        width: 55,
        height: 40
    },
    imageContainer:{
        width: 60,
        height: 60,
        justifyContent:'center',
        alignItems:'center'
    },
    deleteContainer:{
        marginTop: 50 ,
        width:'80%',
        alignSelf:'center',
        backgroundColor:'#fb7b6b',
        borderColor: '#522d5b',
        borderWidth: 2,
        padding: 5,
    }, 
    deleteView:{
        marginBottom: 10,
        width:'95%',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    deleteText:{
        fontFamily: "Kanit-Regular",
        fontSize: 25
    },
    itemContainer:{
        marginTop: 15 ,
        width:'80%',
        alignSelf:'center',
        backgroundColor:'#00bcd4',
        borderColor: '#522d5b',
        borderWidth: 2,
        padding: 5,
    }, 
    itemView:{
        width:'95%',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    itemText:{
        fontFamily: "Kanit-Regular",
        fontSize: 25,
    },

    botContainer:{
        width:'100%',
        backgroundColor: '#e7d39f',
        padding: 5,
        position:'absolute',
        bottom: 0
    }, 
    navContainer:{
        marginBottom: 10,
        width:'95%',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    homeLogo: {
        width: 60,
        height: 65,
    },
    checkedLogo:{
        width: 50,
        height: 55, 
    }
    

 });