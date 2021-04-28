import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuRestrito from '../../assets/components/MenuRestrito'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { css } from '../../assets/css';

export default function Edição({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [displayQR, setDisplayQR] = useState('flex');
    const [displayForm, setDisplayForm] = useState('none');
    const [code, setCode] = useState(null);
    const [product, setProduct] = useState(null);
    const [localization, setLocalization] = useState(null);
  
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      //Leitura do QRCode
      async function handleBarCodeScanned({ type, data }){
        setScanned(true);
        setDisplayQR('none')
        setDisplayForm('flex')
        setCode(data)
      };

      async function sendForm() {

      }
    

    return (
        <View>
           <MenuRestrito title="Edição" navigation={navigation} />
           <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : value=>handleBarCodeScanned(value)}
                style={css.qrcode(displayQR)}
            />

            <View style={css.qrForm(displayForm)}>
                <View style={css.perfilContainer}>
                    <Text style={css.perfilMsg}>Código do produto: {code}</Text>
                    
                    <TextInput style={css.inputLogin} placeholder="Nome do produto" placeholderTextColor="#FFFBFF" onChangeText={text => setProduct(text)} value={product} />
                    
                    <View>
                        <TextInput style={css.inputLogin} placeholder="Localização do produto" placeholderTextColor="#FFFBFF" onChangeText={text => setLocalization(text)} value={localization} />
                    </View>
                    
                    <TouchableOpacity style={css.btnLogin} onPress={() => sendForm()}>
                        <Text>Atualizar</Text>
                    </TouchableOpacity>
                </View>
            </View>
       </View>

    )
}