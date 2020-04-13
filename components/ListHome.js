import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

const ListHome = props => {
    return(
        <TouchableOpacity
            onPress={() => alert('hitttttt')}>
            <View style={styles.listItem}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        onPress={() => alert('hit')}>
                        <Image style={styles.logo} source={require('../Images/SDCircle.png')}></Image>
                    </TouchableOpacity>   
                </View>
                    <Text style={styles.listText}>{props.title}</Text>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        onPress={() => alert('hitt')}>
                        <Image style={styles.editLogo} source={require('../Images/SDEdit.png')}></Image>
                    </TouchableOpacity> 
                </View>
            </View> 
        </TouchableOpacity> 
    )
};

const styles = StyleSheet.create({
    listItem:{
        padding: 10,
        marginVertical: 10,
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
    }
})
export default ListHome