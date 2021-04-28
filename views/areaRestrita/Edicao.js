import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuRestrito from '../../assets/components/MenuRestrito'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { css } from '../../assets/css';
import config from '../../config/config.json'
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';

export default function Edição({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [displayQR, setDisplayQR] = useState('flex');
    const [displayForm, setDisplayForm] = useState('none');
    const [code, setCode] = useState(null);
    const [product, setProduct] = useState(null);
    const [localization, setLocalization] = useState(null);
    const [response, setResponse] = useState(null);
  
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);

      useEffect(() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
          }
        })();
      });

      //Leitura do QRCode
      async function handleBarCodeScanned({ type, data }){
        setScanned(true);
        setDisplayQR('none')
        setDisplayForm('flex')
        setCode(data)
        await getLocation()
        await searchProduct(data)
      };
      
      async function searchProduct(codigo) {
        let response = await fetch(config.urlRoot + 'searchProduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: codigo
            })
        });
        let json = await response.json();
        setProduct(json.name);

    }
    
    //Envia o formulário com os dados para Edição
    async function sendForm() {
        let response = await fetch(`${config.urlRoot}update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
                product: product,
                local: localization
            })
        })
        let json = await response.json()
        setResponse(json)
    }

      //Nova leitura do QRCode
      async function readAgain(){
          setScanned(false)
          setDisplayQR('flex')
          setDisplayForm('none')
          setCode(null)
          setProduct(null)
          setLocalization(null)
      }


      //Retorna posição e endereço do usuário
      async function getLocation() {
        let location = await Location.getCurrentPositionAsync({});
        Geocoder.init(config.geoCodingAPI);
        Geocoder.from(location.coords.latitude, location.coords.longitude)
		    .then(json => {
        		let number = json.results[0].address_components[0].short_name;
                let street = json.results[0].address_components[1].short_name;
			    setLocalization(`${street} - ${number}`);
		    })
		    .catch(error => console.warn(error));
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
                    <Text style={css.perfilMsg}>{response}</Text>
                    
                    <TextInput style={css.inputLogin} placeholder="Nome do produto" placeholderTextColor="#FFFBFF" onChangeText={text => setProduct(text)} value={product} />
                    
                    <View>
                        <TextInput style={css.inputLogin} placeholder="Localização do produto" placeholderTextColor="#FFFBFF" onChangeText={text => setLocalization(text)} value={localization} />
                    </View>
                    
                    <TouchableOpacity style={css.btnLogin} onPress={() => sendForm()}>
                        <Text>Atualizar</Text>
                    </TouchableOpacity>

                    {scanned && 
                        <View> 
                            <Button title="Escanear novamente" onPress={() => readAgain()} />
                        </View>

                    }
                </View>
            </View>
       </View>

    )
}