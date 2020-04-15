import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Image, AsyncStorage, RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ListHome from './ListHome'


class Home extends Component {
    state={
        lists:[],
        done:false,
        refreshing: false
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
        .then( this.setState({refreshing: false}))
    }
    list = async(data) =>{
        try {
            const lists = data.user.lists
            this.setState({
                lists: lists
            })
          } catch (error) {
            console.log(error)
            alert('Something went wrong please try again!')
            this.props.navigation.navigate('Login')
          };
    };
    onRefresh = () =>{
        this.setState({refreshing:true})
        this.loadPage()
    }
    render(){
        return(
            <Modal animationType='fade'> 
                    <View style={styles.listItem}>
                            <Text style={styles.listText}> List </Text>
                    </View> 
                <View style={styles.list}>
                    <FlatList
                     data={this.state.lists}
                     renderItem={itemData => <ListHome list={itemData.item}/> }
                     keyExtractor={itemData => itemData.id.toString()}
                     refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}
                     /> 
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
    listItem:{
        padding: 10,
        backgroundColor: '#e7d39f',
        borderColor: '#522d5b',
        borderWidth: 2,
        flexDirection: 'row',
        alignItems:'center',
        width:'100%',
    },
    listText:{
        paddingLeft: 10,
        fontFamily: "K2D-Medium",
        fontSize: 30
    },
    header:{
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
    title:{
        color:'black',
        fontSize: 18,
        fontWeight: '900',
        marginBottom: '10%'
    },
    list:{
        height: '78%'
    }

});

export default Home;