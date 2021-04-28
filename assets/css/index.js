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
      height: 100,
      justifyContent: 'space-around'
    },

    logo: {
      width: 450,
      height: 450
    },

    logo2: {
      width: 350,
      height: 170
    },

    btnPrimary: {
      height: 40,
      width: 300,
      backgroundColor: secondary,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center'
    },

    btnSecondary: {
      height: 40,
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
    },

    inputLogin: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: white,
      height: 50,
      width: 350,
      color: white,
      padding: 15,
      marginBottom: 20
    },

    btnLogin: {
      height: 50,
      width: 180,
      backgroundColor: secondary,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center'
    },

    formLogin: {
      justifyContent: 'center',
      alignItems: 'center'
    },

    loginErro:(text='none') => ({
      marginBottom: 30,
      color: '#f00',
      display: text
    }),

    areaTab: {
      backgroundColor: darkPrimary,
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333'
    },

    areaMenu: {
      flexDirection: 'row',
      paddingTop: 60,
      paddingBottom: 20,
      width: '100%',
      backgroundColor: darkPrimary,
      alignItems: 'center',
      justifyContent: 'center'
    },
    
    btnHome: {
      textAlign: 'left',
    },

    areaTitle: {
      width: '70%',
      fontWeight: 'bold',
      fontSize: 20,
      color: white,
      textAlign: 'center'
    }, 

    btnLogout: {
      textAlign: 'right'
    },

    perfilContainer: {
      alignItems: 'center',
      backgroundColor: primary,
      height: '100%'
    },

    perfilMsg: {
      fontWeight: 'bold',
      color: colorAuxliar,
      marginTop: 40,
      marginBottom: 40,
    }



});

export { css }