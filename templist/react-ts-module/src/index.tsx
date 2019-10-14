import React from 'react'
import './index.scss'

export interface HelpProps {
    name: string
}


const Help: React.FC<HelpProps> = ()=> {
    return <span className='help'>this is help</span>
}

export default Help