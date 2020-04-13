import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

const ItemList = props => {

    return(
        <TouchableOpacity
            onPress={() => alert('HITTTT') }>
            <View style={styles.listItem}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        onPress={() => alert('hit')}>
                        <Image style={styles.logo} source={require('../Images/SDCircle.png')}></Image>
                    </TouchableOpacity>   
                </View>

                    <Text style={styles.listText}>{props.item.title}</Text>
                    
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
        // backgroundColor: '#ffd31d',
        borderColor: '#522d5b',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center',
        width:'85%',
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
export default ItemList