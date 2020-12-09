import React,{FC, useCallback} from 'react'
//import styled from 'styled-components'

type InputProps = {
    placeholder?: string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>)=>void;
    value: string;
}

const Input: FC<InputProps> = ({placeholder, onChange, value}) => {

    const handleOnChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=> onChange(e) ,[onChange])

    return(
        <input value={value} onChange={handleOnChange} placeholder={placeholder}/>
    )
}

export default Input;