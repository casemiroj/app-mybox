import React from 'react';
import { View, Text, Image } from 'react-native';
import { css } from '../assets/css'

export default function Login() {
    return (
        <View style={css.container}>
            <Image source={require('../assets/img/logo-horizontal.png')}  style={css.logo}/>
        </View>
    )
}