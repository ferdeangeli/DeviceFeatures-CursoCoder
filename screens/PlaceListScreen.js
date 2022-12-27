import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PlaceItem from '../components/PlaceItem'

const PlaceListScreen = ({navigation}) => {

    const places = useSelector((state) => state.places)

    useEffect(()=>{
        console.log(places)
    },[places])


    const renderItem = (item) => (
        <PlaceItem 
            title={item.title}
            image={item.image}
            address='3344 La Plata, Arg.'
            onSelect={() => navigation.navigate('Detalle')}        />
    )
    
    return (
        <FlatList 
            data={places}
            keyExtractor={item => item.id}
            renderItem= {renderItem}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PlaceListScreen
