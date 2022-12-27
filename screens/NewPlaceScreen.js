import React from 'react'
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native'
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'
import { addPlace } from '../store/places.actions'
import { useState } from 'react'
import ImageSelector from '../components/ImageSelector'
import LocationSelector from '../components/LocationSelector'

const NewPlaceScreen = ({navigation}) => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState("")

    const handleTitleChange = (text) => setTitle(text)

    const handleSave = () => {
        dispatch(addPlace(title));
        navigation.navigate('Direcciones')
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Titulo</Text>
                <TextInput style={styles.input} onChangeText={handleTitleChange} value={title} />
                <ImageSelector onImage={(image) => console.log(image)} />
                <LocationSelector />
                <Button title='Grabar direccion' color={Colors.MAROON} onPress={handleSave} />
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:30
    },
    label:{
        fontSize:18,
        marginBottom: 16
    },
    input:{
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        marginBottom:16,
        paddingHorizontal:2,
        paddingVertical:4
    }
})

export default NewPlaceScreen
