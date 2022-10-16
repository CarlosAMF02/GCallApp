import React from 'react'

import 
{
    Text,
    TouchableOpacity,
    StyleSheet
} 
from 'react-native'

export default function FormButton({text, onClick}) {

    return (
        <TouchableOpacity style={estilos.button} onPress={onClick}>
            <Text style={estilos.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const estilos = StyleSheet.create({
    button : {
        backgroundColor : '#667080',
        borderRadius : 6,
        height : 40,
        lineHeight : 40,
        marginBottom : 16,
      },
      buttonText : {
        color : '#FFF',
        lineHeight : 40 ,
        textAlign : 'center' ,
        textTransform : 'uppercase' ,
        fontWeight : 'bold' ,
        fontSize : 12
      },
  })
