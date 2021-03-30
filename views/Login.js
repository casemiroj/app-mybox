import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native';
import { css } from '../assets/css'

export default function Login() {

    const [display, setDisplay]=useState('none');

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={css.container}>
            <View>
                <Image source={require('../assets/img/logo-horizontal.png')}  style={css.logo2}/>
            </View>

            <View>
                <Text style={css.loginErro(display)}>Usuário ou senha inválidos!</Text>
            </View>

            <View style={css.formLogin}>
                <TextInput style={css.inputLogin} placeholder="Email" placeholderTextColor="#FFFBFF" />
                <TextInput style={css.inputLogin} placeholder="Senha" secureTextEntry={true} placeholderTextColor="#FFFBFF"/>
                <TouchableOpacity style={css.btnLogin}>
                    <Text style={css.txtBtn}>Entrar</Text>
                </TouchableOpacity>
            </View> 
        </KeyboardAvoidingView>
    )
}