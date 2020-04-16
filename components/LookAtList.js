import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet, Modal, TouchableOpacity, Text, Image, FlatList, Alert, ScrollView} from 'react-native'
import ItemList from './ItemList'
import AddItem from './AddItem'
export default class LookAtList extends Component{
    state = {
        newItems:[],
        addItem: false,
        refreshing: false
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
        .then(this.props.goHome)
        .catch(error => {
            console.log(error)
            alert("Something went wrong please try again!")
        })
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
    goHome = (result) => {
        this.setState({addItem:false})
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
                    <AddItem visible={this.state.addItem} goHome={this.goHome} list={this.props.info}/>
                </View>
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
                    <View style={styles.itemCont}>
                        <Text style={styles.itemIntro}>Items:</Text>
                        <View style={styles.itemContainer} > 
                            <TouchableOpacity
                            onPress={() => this.setState({addItem: true})}>
                                <View style={styles.itemView}>
                                    <Text style={styles.itemText}> Add Item</Text>
                                </View>
                            </TouchableOpacity>                      
                        </View>  
                    </View>
                    <View style={styles.itemList}>
                        <FlatList
                        data={this.props.info.items}
                        renderItem={itemData => <ItemList item={itemData.item}/> }
                        keyExtractor={itemData => itemData.id.toString()}
                        />
                    </View>
 
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
        fontFamily: "K2D-Medium",
        width:'50%',
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
        fontFamily: "K2D-Medium",
        fontSize: 20
    },
    listDText:{
        fontFamily: "K2D-Medium",
        fontSize: 25
    },
    itemIntro:{
        paddingLeft: 10,
        fontFamily: "K2D-Medium",
        fontSize: 25
    },
    itemList:{
        height: "69%",
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
        borderRadius: 10,
    }, 
    deleteView:{
        marginBottom: 10,
        width:'95%',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    deleteText:{
        fontFamily: "K2D-Medium",
        fontSize: 25
    },
    itemCont:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:10
    },
    itemContainer:{
        marginTop: 10 ,
        width:'40%',
        height:50,
        alignSelf:'center',
        backgroundColor:'#00bcd4',
        borderColor: '#522d5b',
        borderWidth: 2,
        padding: 5,
        borderRadius: 10
    }, 
    itemView:{
        width:'95%',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    itemText:{
        fontFamily: "K2D-Medium",
        fontSize: 20
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