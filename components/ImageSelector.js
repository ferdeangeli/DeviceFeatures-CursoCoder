import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
//import * as Permissions from 'expo-permissions'
import Colors from '../constants/Colors'

const ImageSelector = () => {

    const [pickedUri, setPickedUri] = useState()

    const verifyPermissions = async () => {
        const {status} = await ImagePicker.requestCameraPermissionsAsync()

        if(status != 'granted'){
            Alert.alert(
                'Permisos insuficientes',
                'Necesita dar permisos de la camara para usar la aplicacion',
                [{text: 'OK'}]
            )
            return false
        }
        return true
    }

    const handlerTakeImage = async () => {
        const isCameraOk = await verifyPermissions()
        if(!isCameraOk) return

        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.8
        })

        setPickedUri(image.uri)
        props.onImage(image.uri)
    }

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickedUri ? (<Text>No hay imagen seleccionada</Text>) : (<Image style={styles.image} source={{uri: pickedUri}} />)}
      </View>
      <Button title='Tomar foto' color={Colors.LIGTH_PINK} onPress={handlerTakeImage} />
    </View>
  )
}

export default ImageSelector

const styles = StyleSheet.create({
    container:{
        marginBottom:20
    },
    preview:{
        width: '100%',
        height: 200,
        marginBottom:10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.BLUSH,
        borderWidth: 1
    },
    image:{
        width: '100%',
        height: '100%'
    }
})