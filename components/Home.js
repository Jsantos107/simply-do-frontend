import React, { Component } from 'react';
import axios from 'axios';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Image, AsyncStorage, Button } from 'react-native';
import Welcome from './Welcome';
import { FlatList } from 'react-native-gesture-handler';
import ListHome from './ListHome'

const Drawer = createDrawerNavigator();

class Home extends Component {
    state={
        lists:[],
        done:false
    };
    componentDidMount(){ this.loadPage() }

    loadPage = async () => {
        const token = await AsyncStorage.getItem('token')
        axios.get("https://simply-do-backend.herokuapp.com/users", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              } 
        })
        .then(async (response) => this.list(response.data))
    }
    list = async(data) =>{
        try {
            const lists = data.user.lists
            this.setState({
                lists: lists
            })
            console.log(this.state.lists)
          } catch (error) {
            console.log(error)
            alert('Something went wrong please try again!')
            this.props.navigation.navigate('Welcome')
          };
    };
    render(){
        return(
            <Modal animationType='fade'> 
                <View>
                    <FlatList
                     data={this.state.lists}
                     renderItem={itemData => <ListHome list={itemData.item}/> }
                     keyExtractor={itemData => itemData.id}/> 
                </View>
                <View style={styles.header} >
                    <View style={styles.navContainer}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AddList')}>
                            <Image style={styles.logo} source={require('../Images/SDPlus.png')}></Image>
                        </TouchableOpacity>                      
                    </View>
                </View>

            </Modal>
        );
    };

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