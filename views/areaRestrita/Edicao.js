import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuRestrito from '../../assets/components/MenuRestrito'

export default function Edição({navigation}) {
    return (
        <View>
           <MenuRestrito title="Edição" navigation={navigation} />
       </View>

    )
}