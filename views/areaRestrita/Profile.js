import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {css} from '../../assets/css'
import Icon from 'react-native-vector-icons/FontAwesome'
import MenuRestrito from '../../assets/components/MenuRestrito'

export default function Profile({navigation}) {
    return (
       <View>
           <MenuRestrito title="Perfil" navigation={navigation} />
       </View>
    )
}