import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {css} from '../../assets/css'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function MenuRestrito(props){
    async function logout() {
        await AsyncStorage.clear()
        props.navigation.navigate('Login')
    }

    return (
        <View style={css.areaMenu}>
            <TouchableOpacity style={css.btnHome} onPress={()=>props.navigation.navigate('Home')}>
                <Icon name='home' size={20} color='#fff' />
            </TouchableOpacity>
            
            <Text style={css.areaTitle}>{props.title}</Text>
            
            <TouchableOpacity style={css.btnLogout} onPress={()=>logout()}>
                <Icon name='sign-out' size={20} color='#fff' />
            </TouchableOpacity>
        </View>
    )
}