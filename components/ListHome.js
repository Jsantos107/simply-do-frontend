import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import LookAtList from './LookAtList'
import EditList from './EditList'
const ListHome = props => {
    const [listLook, setlistLook] = useState(false);
    const [editList, setEditList] = useState(false);

    const goHome = () => {
        setlistLook(false)
        setEditList(false)
      }
    const checkList = (info) => {
        fetch(`https://simply-do-backend.herokuapp.com/lists/${info.id}`, {
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: info.title,
                description: info.description,
                done: true
            })
        })
        .then(alert('Your list has been checked'))
        .catch(error => {
            console.log(error)
            alert("Something went wrong please try again!")
        })
    }  
    
    const checking = (info) =>{
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
            { text: "Yes", onPress: () => checkList(info) }
            ],
            { cancelable: false }
        );
    }

    let checked;
      if(props.list.done === true){
          checked = <Image style={styles.checkedLogo} source={require('../Images/SDLogo.png')}></Image>
      }else{
          checked = <Image style={styles.logo} source={require('../Images/SDCircle.png')}></Image>
      }
    return(
        <TouchableOpacity
            onPress={() => setlistLook(true) }>
            <View>
                <LookAtList visible={listLook} goHome={goHome} info={props.list} edit={setEditList}/>
            </View>
            <View>
                <EditList visible={editList} goHome={goHome} list={props.list} /> 
            </View>
            <View style={styles.listItem}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        onPress={() => checking(props.list)}>
                        {checked}
                    </TouchableOpacity>   
                </View>
                    <Text style={styles.listText}>{props.list.title}</Text>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        onPress={() => setEditList(true) }>
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
    },
    checkedLogo:{
        width: 45,
        height: 50
    }
})
export default ListHome