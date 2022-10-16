import React, {
  useContext,
  useState
} from 'react'

import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView
} from 'react-native'
import FormInput from '../../components/FormInput'

import AtendenteContext from '../../contexts/AtendenteContext'
import { login } from '../../services/AtendenteService'

export default function Login(props) {

  const {setId, setName} = useContext(AtendenteContext)

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const clickLogin = () => {
    if ( email === '' ) {
      alert('Informe seu e-mail!')
      return
    }

    if ( senha === '' ) {
      alert('Informe sua senha!')
      return
    }

    const regextEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if ( ! regextEmail.test( email ) ) {
      alert('Informe um e-mail válido!')
      return 
    }
    
    login(email, senha)
      .then((response) => {
        const { id, name } = response.data
        setId(id)
        setName(name)
        props.navigation.navigate('Listagem')
      })
      .catch((error) => {
        const { message } = error
        if (message.includes('status code 401')) {
          return alert('Os dados informados não correspondem!')
        }
        alert('Erro ao realizar o login!')
      })

  }

  return (
    <SafeAreaView>
      <ScrollView style={{ marginVertical : 32 , padding : 32 }}>
      <Text style={estilos.title}>Bem-vindo de volta!</Text>
      <Text style={estilos.text}>Faça login abaixo ou  
        <TouchableOpacity onPress={() => props.navigation.navigate('Cadastro')}>
          <Text style={estilos.link}> crie uma conta</Text>
        </TouchableOpacity>
      </Text>
      <FormInput text='Digite seu E-mail: ' placeholder='Ex: email@email.com' setState={setEmail} state={email}/>
      <FormInput text='Digite sua Senha: ' placeholder='Ex: ******' setState={setSenha} state={senha} password={true}/>

      <TouchableOpacity style={estilos.button} onPress={clickLogin}>
         <Text style={estilos.buttonText}>Entrar</Text>
       </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate('Senha')}>
          <Text style={{ textAlign : 'center',textDecorationLine : "underline", fontWeight :      "bold", color : "#959595" }}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
  button : {
    backgroundColor : '#667080',
    borderRadius : 6,
    height : 40,
    lineHeight : 40,
    marginTop : 16,
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
  title : {
    textAlign : 'center',
    fontFamily : 'Arial',
    fontWeight : 'bold',
    color : '#667080',
    marginVertical : 24,
    fontSize : 28,
  },
  text : {
    color : "#667080",
    fontSize : 14, 
    paddingVertical : 3,
  },
  link : {
    textDecorationLine : "underline",
    color : "#667080",
    fontWeight : "bold",
    marginBottom : -4
  }
})