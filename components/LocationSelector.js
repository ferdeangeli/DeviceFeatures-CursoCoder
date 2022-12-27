import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React from 'react'
import * as Location from 'expo-location'
import Colors from '../constants/Colors'
import { useState } from 'react'

const LocationSelector = ({onLocation}) => {

    const [pickedLocation, setPickedLocation] = useState()

    const verifyPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()

        if(status != 'granted'){
            Alert.alert(
                'Permisos insuficientes',
                'Necesita dar permisos de localizacion para utilizar la aplicacion',
                [{text: 'OK'}]
            )
            return false
        }
        return true
    }

    const handleGetLocation = async () => {
        const isLocationOk = await verifyPermissions()

        if(!isLocationOk) return

        const location = await Location.getCurrentPositionAsync({
            timeout: 5000
        })

        setPickedLocation({
            lat: location.coords.latitude,
            long: location.coords.longitude
        })

        onLocation({
            lat: location.coords.latitude,
            long: location.coords.longitude
        })
    }

  return (
    <View style={styles.container}>
        <View style={styles.preview}>
            {pickedLocation ? <Text>{pickedLocation.lat}, {pickedLocation.long}</Text> : <Text>Esperando ubicacion</Text>}
        </View>
        <Button title='Obtain Location' color={Colors.PEACH_PUFF} onPress={handleGetLocation}/>
    </View>
  )
}

export default LocationSelector

const styles = StyleSheet.create({
    container:{
        marginBottom:10,
    },
    preview:{
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.BLUSH,
        borderWidth:1
    },
    image:{
        width: '100%',
        height: '100%'
    }
})