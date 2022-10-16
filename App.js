import React, {useContext} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AtendenteContext, {AtendenteProvider} from './contexts/AtendenteContext'

import Login from './screens/Atendente/Login'
import Cadastro from './screens/Atendente/Cadastro'
import Listagem from './screens/Chamados/Listagem'
import ListagemCliente from './screens/Chamados/ListagemCliente'

const Stack = createNativeStackNavigator()

export default function App() {
  const {id} = useContext(AtendenteContext)
  
  return (
    <AtendenteProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Cadastro' component={Cadastro} />
          <Stack.Screen name='Listagem' component={Listagem} />
          <Stack.Screen name='Listagem Cliente' component={ListagemCliente} />
        </Stack.Navigator>
      </NavigationContainer>
    </AtendenteProvider>    
  )
}