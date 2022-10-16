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

import {listarChamados, listarChamadosCliente} from '../../services/ChamadoService'
import Chamado from './Chamado'

export default function Listagem(props) {

    const [isLoading, setIsLoading] = useState(false)

    const {id, name} = useContext(AtendenteContext)

    const [chamados, setChamados] = useState([])

    function chamadosAtendente() {
        setIsLoading(true)
        listarChamados(id)
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
                chamadosAtendente()
            })

            return unsubscribe
        }, 
        []
    )

    return (
        <SafeAreaView style={{ padding : 32, height : '100%' }}>
            <View>
                <Text style={estilos.title}>Olá, {name}</Text>
                <Text style={estilos.description}>Seus Chamados</Text>
            </View>
            {id==='' && (
                <Text>Não foi possível encontrar os Chamados! Faça seu Login Novamente</Text>
            )}
            <FlatList 
                data={ chamados }
                renderItem={ ({item}) => {
                    const { departamentName, description } = item.chamado
                    const { id, cpf } = item.chamado.cliente
                    const { statusName } = item.chamado.status
                    return <Chamado departamento={departamentName} descricao={description} cpf={cpf} status={statusName} onClick={() => props.navigation.navigate('Listagem Cliente', { idCliente: id})}/>
                }}
                refreshControl={
                    <RefreshControl 
                        refreshing={ isLoading }
                        onRefresh={ () => chamadosAtendente() }/>
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
    },
    title: {
        textAlign : 'center',
        fontFamily : 'Arial',
        fontWeight : 'bold',
        color : '#667080',
        marginBottom : 32,
        fontSize : 30,
    }
})