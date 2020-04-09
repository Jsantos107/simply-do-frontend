import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class Welcome extends Component {
    state={
        visible: false
    }

    render(){
    return(
        <View style={styles.home} >
            <Text style={styles.title}> !!! </Text>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.title}> Login </Text>
            </TouchableOpacity>
        </View>
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

export default Welcome;