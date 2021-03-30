import { StyleSheet } from 'react-native';

const primary = '#231651';
const darkPrimary = '#1E1345';
const lightPrimary = '#2D1C66'; 
const secondary = '#ECA400';
const black = '#252318'; 
const white = '#FFFBFF'; 
const colorAuxliar = '#9DB85F';

const css = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: primary,
      alignItems: 'center',
      justifyContent: 'center'
    },

    container2: {
      height: 120,
      justifyContent: 'space-around'
    },

    logo: {
      width: 450,
      height: 450
    },

    btnPrimary: {
      height: 50,
      width: 300,
      backgroundColor: secondary,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center'
    },

    btnSecondary: {
      height: 50,
      width: 300,
      borderWidth: 1,
      borderColor: white,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center'
    },

    txtBtn: {
      color: white,
      fontSize: 20
    }
});

export { css }