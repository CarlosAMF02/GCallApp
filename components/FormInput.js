import React from 'react'

import 
{
    Text,
    TextInput,
    View,
    StyleSheet
} 
from 'react-native'

export default function FormInput({text, placeholder, setState, state, keyboardType='name-phone-pad',maxLength=30,password=false}) {

    return (
        <View>
            <Text style={estilos.text}>{text}</Text>
            <TextInput style={estilos.input}
                placeholder={placeholder}
                onChangeText={ (txt) => setState(txt) } 
                value={ state } 
                secureTextEntry={password}
                maxLength={maxLength}
                keyboardType={keyboardType}
            />
        </View>
    )
}

const estilos = StyleSheet.create({
    input : {
      borderColor : '#CCC',
      borderRadius : 6,
      borderWidth : 1,
      height : 40,
      lineHeight : 20,
      marginBottom : 12, 
      paddingHorizontal : 10
    },
    text : {
      color : "#667080",
      fontSize : 14, 
      paddingVertical : 3,
    }
  })
