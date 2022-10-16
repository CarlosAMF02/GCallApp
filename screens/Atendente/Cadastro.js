import React, { useState } from 'react'

import 
{
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StyleSheet
} 
from 'react-native'
import FormButton from '../../components/FormButton'
import FormInput from '../../components/FormInput'
import { cadastrarAtendente } from '../../services/AtendenteService'

export default function Cadastro(props) {
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmacaoSenha, setConfirmacaoSenha] = useState('')
    const [cnpj, setCnpj] = useState('')

    const clickCadastro = () => {
        if (nome === '' || cpf === '' || email === '' || senha === '' || confirmacaoSenha === '' || cnpj === '') {
            return alert('Todos os campos do formulário são obrigatórios!')
        }

        if(senha !== confirmacaoSenha) {
            return alert('As senhas não conferem!')
        }

        const regextEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if ( ! regextEmail.test( email ) ) {
            return alert('Informe um e-mail válido!') 
        }

        if(cpf.length !== 11) {
            return alert('Informe um CPF válido!')
        }

        if(cnpj.length !== 14) {
            return alert('Informe um CNPJ válido!')
        }

        cadastrarAtendente(nome, cpf, email, senha, cnpj)
            .then((response) => {
                alert('Cadastro realizado com sucesso!')
                props.navigation.navigate('Login')
            })
          .catch((error) => {
            const { message } = error
            if (message.includes('status code 404')) {
              return alert('Não foi encontrada uma empresa com este CNPJ!')
            }
            if (message.includes('status code 409')) {
                return alert('O CPF ou e-mail informado já foi cadastrado!')
            }
            alert('Erro ao realizar o login!')
          })
    }

    return (
        <SafeAreaView style={{ marginTop : 8 , padding : 16 }}>
            <ScrollView>
                <Text style={estilos.title}>Criar Conta</Text>
                <Text style={estilos.text}>Insira os dados da sua conta abaixo ou  
                    <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                        <Text style={estilos.link}> faça login</Text>
                    </TouchableOpacity>
                </Text>
                <FormInput text='Nome' placeholder='Ex: Paulo' setState={setNome} state={nome}/>
                <FormInput text='CPF' placeholder='Ex: 999.999.999-99' setState={setCpf} state={cpf} maxLength={11} keyboardType='numeric'/>
                <FormInput text='E-mail' placeholder='Ex: paulo@email.com' setState={setEmail} state={email}/>
                <FormInput text='Senha' placeholder='Ex: ******' setState={setSenha} state={senha} password={true}/>
                <FormInput text='Confirmar Senha' placeholder='Ex: ******' setState={setConfirmacaoSenha} state={confirmacaoSenha} password={true}/>
                <FormInput text='CNPJ da Empresa' placeholder='Ex: 11122233344455' setState={setCnpj} state={cnpj} maxLength={14} keyboardType='numeric'/>
                <FormButton text='Salvar' onClick={clickCadastro}/>
                <FormButton text='Voltar' onClick={()=> props.navigation.navigate('Login')}/>
            </ScrollView>
        </SafeAreaView>
    )
}

const estilos = StyleSheet.create({
    title : {
      textAlign : 'center',
      fontFamily : 'Arial',
      fontWeight : 'bold',
      color : '#667080',
      marginVertical : 24,
      fontSize : 30,
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
