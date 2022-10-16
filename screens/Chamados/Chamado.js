import React from 'react'

import 
{
    Text,
    TouchableOpacity,
    StyleSheet
} 
from 'react-native'

export default function Chamado({departamento, descricao, cpf, status, onClick}) {

    return (
        <TouchableOpacity style={estilos.chamado} onPress={onClick}>
            <Text style={estilos.text}>Departamento: {departamento}</Text>
            <Text style={estilos.text}>Descrição: {descricao}</Text>
            <Text style={estilos.text}>CPF do Cliente: {cpf}</Text>
            <Text style={estilos.text}>Status: {status}</Text>
        </TouchableOpacity>
    )
}

const estilos = StyleSheet.create({
    chamado: {
        backgroundColor: '#CCC',
        borderRadius: 8,
        padding: 18,
        margin: 8
    },
    text: {
        fontFamily : 'Arial',
        fontWeight : 'bold',
        color : '#FFF',
        fontSize : 20,
    }
})
