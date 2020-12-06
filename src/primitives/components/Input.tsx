import React,{FC} from 'react'
import styled from 'styled-components'

type InputProps = {
    placeholder?: string;
}

const Input: FC<InputProps> = ({placeholder}) => {
    return(
        <input placeholder={placeholder}/>
    )
}

export default Input;