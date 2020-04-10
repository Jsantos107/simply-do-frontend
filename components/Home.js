import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';

class Home extends Component {

    render(){
    return(
        <Modal animationType='fade'>
            <View style={styles.home} >
                <Text style={styles.title}> Welcome!!! </Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={styles.title}> Home </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
    }
};

const styles = StyleSheet.create({
    home:{
        width:'100%',
        paddingTop: 50,
        backgroundColor: '#f7287b',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    title:{
        color:'black',
        fontSize: 18,
        fontWeight: '900',
        marginBottom: '10%'
    }
});

export default Home;