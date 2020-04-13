import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet, Modal, TouchableOpacity, Text, Image, FlatList } from 'react-native'
import ItemList from './ItemList'

export default class AddList extends Component{

    render(){
        return( 
            <Modal visible={this.props.visible}  animationType='fade'>
                <View>
                    <View style={styles.listItem}>
                        <View style={styles.imageContainer}>
                            <TouchableOpacity
                                onPress={() => alert('hit')}>
                                <Image style={styles.logo} source={require('../Images/SDCircle.png')}></Image>
                            </TouchableOpacity>   
                        </View>
                            <Text style={styles.listText}>{this.props.info.title}</Text>
                        <View style={styles.imageContainer}>
                            <TouchableOpacity
                                onPress={() => alert('hitt')}>
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
                <View style={styles.deleteContainer} > 
                    <TouchableOpacity
                    onPress={()=>alert('delete')}>
                        <View style={styles.deleteView}>
                            <Text style={styles.deleteText}> Delete List</Text>
                        </View>
                    </TouchableOpacity>                      
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
        width: 40,
        height: 40
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
    logo: {
        width: 60,
        height: 65,
    }
    

 });