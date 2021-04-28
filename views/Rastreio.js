import React, {useState, useEffect} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import {css} from '../assets/css'
import config from '../config/config.json'

export default function Rastreio() {
    const [code, setCode] = useState(null)
    const [response, setResponse] = useState(null)

    //Envia dados do formulário
    async function sendForm() {
        let response = await fetch(`${config.urlRoot}rastreio`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code
            })
        })

        let json = await response.json()
        setResponse(json)
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={css.container}>
                <Image source={require('../assets/img/rastreio.png')} style={css.logoRastreio}/>

                <TextInput style={css.inputLogin} placeholder="Digite o código de rastreio" placeholderTextColor="#FFFBFF" onChangeText={text=>setCode(text)} />

                <TouchableOpacity style={css.btnLogin} onPress={() => sendForm()}>
                    <Text>Rastrear</Text>
                </TouchableOpacity>

                <Text style={css.perfilMsg}>{response}</Text>
        </KeyboardAvoidingView>
    )
}