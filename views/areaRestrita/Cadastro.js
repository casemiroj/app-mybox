import React, {useState, useEffect} from 'react';
import { View, TextInput, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuRestrito from '../../assets/components/MenuRestrito'
import config from '../../config/config.json'
import {css} from '../../assets/css'

export default function Cadastro({navigation}) {

    const address = config.origin
    const [code, setCode] = useState(null)
    const [user, setUser] = useState(null)
    const [product, setProduct] = useState(null)
    const [response, setResponse] = useState(null)

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        randomCode()
    }, [])

    //Pegar id do usuário
    async function getUser() {
        let response = await AsyncStorage.getItem('userData')
        let json = JSON.parse(response)
        setUser(json.id)
    }

    //Gerar código
    async function randomCode() {
        let result = '';
        let length=20;
        let chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        setCode(result);
    }

    //Envio formulário
    async function sendForm() {
        let response = await fetch(`${config.urlRoot}create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user,
                code: code,
                product: product,
                local: address
            })
        })
    }

    return (
        <View>
           <MenuRestrito title="Cadastro" navigation={navigation} />

           <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View  style={css.perfilContainer}>
                    <TextInput style={css.inputLogin} placeholder="Nome do produto" placeholderTextColor="#FFFBFF" onChangeText={text => setProduct(text)} />
                    <TouchableOpacity style={css.btnLogin} onPress={() => sendForm()}>
                        <Text>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
           </KeyboardAvoidingView>
       </View>

    )
}