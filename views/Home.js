import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { css } from '../assets/css'

export default function Home({ navigation }) {
    return (
        <View style={css.container}>
            <Image source={require('../assets/img/logo.png')} style={css.logo}/>
            
            <View style={css.container2}>
                <TouchableOpacity style={css.btnSecondary} onPress={() => navigation.navigate('Login')}>
                    <Text style={css.txtBtn}>Login (Somente ADMs)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={css.btnPrimary} onPress={() => navigation.navigate('Rastreio')}>
                    <Text style={css.txtBtn}>Rastreio</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}