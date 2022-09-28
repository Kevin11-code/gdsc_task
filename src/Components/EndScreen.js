import React,{useContext} from 'react'
import {QuizContext} from '../Helper/Context'

function EndScreen() {

    const {score, setScore} = useContext(QuizContext)


    return (
        <div className='end-screen'>
            <h1>Final Score : {score}</h1>
        </div>
    )
}

export default EndScreen ;
