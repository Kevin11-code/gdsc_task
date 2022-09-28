import React , {useContext} from 'react'
import {QuizContext} from '../Helper/Context'
import '../App.css'


function MainMenu() {

    const {gameState , setGameState} = useContext(QuizContext)

    return (
        <div className='menu'>
            <button 
                onClick={() => setGameState("quiz")} 
                className="menu-button"
            >
                Start Quiz
            </button>
        </div>
    )
}

export default MainMenu;