import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';

class Welcome extends Component {
    state={
        visible: false
    }

    render(){
    return(
        <Modal animationType='slide'>
            <View style={styles.welcome} >
                <Text style={styles.title}> Lets start simply doing together </Text>
                <View style={styles.btnContainer}> 
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Login')}
                        style={styles.button}>
                        <Text style={styles.btnText}> Sign-up </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Login')}
                        style={styles.button}>
                        <Text style={styles.btnText}> Login </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
    }
};

const styles = StyleSheet.create({
    welcome:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        width:'100%',
        paddingTop: 50,
        backgroundColor: '#d7385e'
    },
    title:{
        fontSize: 30,
        textAlign: 'center',
        margin:15,
        fontFamily: "Kanit-Regular"
    },
    btnContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: '75%',
        flexDirection: 'row',
    },
    button:{
        backgroundColor: "#e7d39f",
        padding: 15,
        width:'45%',
    },
    btnText:{
        fontSize:18,
        textAlign:'center',
        fontFamily: "Kanit-Regular"
    }
});

export default Welcome;