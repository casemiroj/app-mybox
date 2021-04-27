import React, {useState, useEffect} from 'react';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {css} from '../../assets/css'
import Icon from 'react-native-vector-icons/FontAwesome'
import MenuRestrito from '../../assets/components/MenuRestrito'
import config from '../../config/config.json'

export default function Profile({navigation}) {

    const[idUser, setIdUser] = useState(null)
    const[senhaAntiga, setSenhaAntiga] = useState(null)
    const[novaSenha, setNovaSenha] = useState(null)
    const[confNovaSenha, setConfNovaSenha] = useState(null)
    const[msg, setMsg] = useState(null)

    useEffect(() => {
        async function getIdUser(){
            let response = await AsyncStorage.getItem('userData')
            let json = JSON.parse(response)
            setIdUser(json.id)
        }
        getIdUser()
    })

    async function sendForm() {
        let response = await fetch(`${config.urlRoot}verifyPass`, {
            method: 'POST',
            body: JSON.stringify({
                id: idUser,
                senhaAntiga: senhaAntiga,
                novaSenha: novaSenha,
                confNovaSenha: confNovaSenha
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let json = await response.json();
        setMsg(json)
    }

    return (
       <View>
           <MenuRestrito title="Perfil" navigation={navigation} />

           <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View  style={css.perfilContainer}>
                <Text style={css.perfilMsg}>{msg}</Text>
                <TextInput style={css.inputLogin} placeholder="Senha antiga" placeholderTextColor="#FFFBFF" onChangeText={text => setSenhaAntiga(text)} />
                <TextInput style={css.inputLogin} placeholder="Nova senha" placeholderTextColor="#FFFBFF" onChangeText={text => setNovaSenha(text)} />
                <TextInput style={css.inputLogin} placeholder="Confirmação de nova senha" placeholderTextColor="#FFFBFF" onChangeText={text => setConfNovaSenha(text)} />

                <TouchableOpacity style={css.btnLogin} onPress={() => sendForm()}>
                    <Text>Redefinir</Text>
                </TouchableOpacity>
            </View>
           </KeyboardAvoidingView>
       </View>
    )
}