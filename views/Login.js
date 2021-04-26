import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { css } from '../assets/css'

export default function Login({navigation}) {

    const [display, setDisplay]=useState('none');
    const [user, setUser]=useState(null);
    const [password, setPassword]=useState(null);
    const [login, setLogin]=useState(false);

    useEffect(() => {
        verifyLogin()
    }, [])

    useEffect(() => {
        if(login === true) {
            biometric()
        }
    }, [login])

    //Verifica se o usuario ja possui login
    async function verifyLogin() {
        let response = await AsyncStorage.getItem('userData')
        let json = await JSON.parse(response);
        if(json !== null) {
            setUser(json.name);
            setPassword(json.password);
            setLogin(true)
        }
    }

    //Biometria
    async function biometric() {
        let compatible = await LocalAuthentication.hasHardwareAsync()
        if(compatible) {
            let biometricRecords = await LocalAuthentication.isEnrolledAsync()
            if(!biometricRecords) {
                alert('Biometria não cadastrada')
            } else {
                let result = await LocalAuthentication.authenticateAsync()
                if(result.success) {
                    sendForm()
                } else {
                    setUser(null)
                    setPassword(null)
                }
            }
        }
    }

    //Envio do formulário
    async function sendForm() {
        let response = await fetch('http://192.168.0.20:3000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user,
                password: password
            })
        })

        let json = await response.json()
        
        if(json === 'error') {
            setDisplay('flex')
            setTimeout(() => {
                setDisplay('none')
            }, 5000)
            await AsyncStorage.clear()
        } else {
            let userData = await AsyncStorage.setItem('userData', JSON.stringify(json))
            navigation.navigate('Restrito')
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={css.container}>
            <View>
                <Image source={require('../assets/img/logo-horizontal.png')}  style={css.logo2}/>
            </View>

            <View>
                <Text style={css.loginErro(display)}>Usuário ou senha inválidos!</Text>
            </View>

            <View style={css.formLogin}>
                <TextInput style={css.inputLogin} placeholder="Usuário" onChangeText={text => setUser(text)} placeholderTextColor="#FFFBFF" />
                <TextInput style={css.inputLogin} placeholder="Senha" onChangeText={text => setPassword(text)} secureTextEntry={true} placeholderTextColor="#FFFBFF"/>
                <TouchableOpacity style={css.btnLogin} onPress={() => sendForm()}>
                    <Text style={css.txtBtn}>Entrar</Text>
                </TouchableOpacity>
            </View> 
        </KeyboardAvoidingView>
    )
}