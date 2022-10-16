import React, {
    useContext,
    useEffect,
    useState
} from 'react'
import {
    FlatList,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native'

import AtendenteContext from '../../contexts/AtendenteContext'

import {listarChamadosCliente} from '../../services/ChamadoService'
import Chamado from './Chamado'

export default function ListagemCliente(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [idCliente, setIdCliente] = useState(props.route.params.idCliente)
    const [chamados, setChamados] = useState([])

    function chamadosCliente() {
        setIsLoading(true)
        listarChamadosCliente(idCliente)
            .then((response) => {
                setChamados(response.data)
                setIsLoading(false)
            })
            .catch((error) => {
                alert('Não foi possível listar seus chamados!')
                setIsLoading(false)
            })
    }

    useEffect(
        () => { 
            const unsubscribe = props.navigation.addListener('focus', () => {
                chamadosCliente()
            })

            return unsubscribe
        }, 
        []
    )

    return (
        <SafeAreaView style={{ padding : 32, height : '100%' }}>
            <View>
                <Text style={estilos.description}>Chamados do Cliente</Text>
            </View>
            <FlatList 
                data={ chamados }
                renderItem={ ({item}) => {
                    const { departamentName, description } = item
                    const { id, cpf } = item.cliente
                    const { statusName } = item.status
                    return <Chamado departamento={departamentName} descricao={description} cpf={cpf} status={statusName}/>
                }}
                refreshControl={
                    <RefreshControl 
                        refreshing={ isLoading }
                        onRefresh={ () => chamadosCliente() }/>
                }/>
        </SafeAreaView>
    )
}

const estilos = StyleSheet.create({
    description: {
        textAlign : 'center',
        fontFamily : 'Arial',
        fontWeight : 'bold',
        color : '#667080',
        marginBottom : 8,
        fontSize : 30,
    }
})