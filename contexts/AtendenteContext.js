import React, {
    createContext,
    useState
} from 'react'

const AtendenteContext = createContext({})

function AtendenteProvider(props) {
    const [id, setId] = useState('')
    const [name, setName] = useState('')

    return (
        <AtendenteContext.Provider value={{ id, setId, name, setName }}>
            {props.children}
        </AtendenteContext.Provider>
    )
}

export default AtendenteContext

export { AtendenteProvider }