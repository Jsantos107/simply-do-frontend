import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'

const ItemList = props => {
    const checkList = () => {
        console.log(props)
        fetch(`https://simply-do-backend.herokuapp.com/items/${props.item.id}`, {
            method: 'PATCH',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: props.item.title,
                description: props.item.description,
                done: true
            })
        })
        .then(alert('Your list has been checked'))
        .catch(error => {
            console.log(error)
            alert("Something went wrong please try again!")
        })
    }  

    const checking = () =>{
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
            { text: "Yes", onPress: () => checkList() }
            ],
            { cancelable: false }
        );
    }
    const itemDes = () =>{
        Alert.alert(
            "Description:",
            `${props.item.description}`,
            [
            {
                text: "Cancel",
            },
            { text: "Got It!"}
            ],
            { cancelable: false }
        );
    }

    let checked;
    if(props.item.done === true){
        checked = <Image style={styles.checkedLogo} source={require('../Images/SDLogo.png')}></Image>
    }else{
        checked = <Image style={styles.logo} source={require('../Images/SDCircle.png')}></Image>
    }
    return(
        <TouchableOpacity
            onPress={() => itemDes()}>
            <View style={styles.listItem}>
                <Text style={styles.listText}>{props.item.title}</Text>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        onPress={() => checking()}>
                            {checked}
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
        backgroundColor: '#ff88',
        borderColor: '#522d5b',
        borderWidth: 2,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center',
        width:'85%',
    },
    listText:{
        paddingLeft: 10,
        fontFamily: "K2D-Medium",
        fontSize: 25
    },
    checkedLogo:{
        width: 45,
        height: 45
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