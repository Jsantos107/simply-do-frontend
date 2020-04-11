import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import Welcome from './Welcome';

const Drawer = createDrawerNavigator();

class Home extends Component {

    render(){
        return(
            <Modal animationType='fade'> 
                <View>
                    
                </View>
                <View style={styles.header} >
                    <View style={styles.navContainer}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Home')}>
                            <Image style={styles.logo} source={require('../SDPlus.png')}></Image>
                        </TouchableOpacity>                      
                    </View>
                </View>

            </Modal>
        );
    }
};

const styles = StyleSheet.create({
    header:{
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
    },
    title:{
        color:'black',
        fontSize: 18,
        fontWeight: '900',
        marginBottom: '10%'
    },

});

export default Home;