import React ,{useContext , useState , useEffect} from 'react'
import {QuizContext} from '../Helper/Context'

export default function Quiz() {
 
    const {gameState , setGameState} = useContext(QuizContext)
    const {score, setScore} = useContext(QuizContext)
    const [quizData , setQuizData] = useState(null)
    const [count , setCount] = useState(0)
    const [formData , setFormData] = useState({
        answer : ""

    })
    useEffect(() => {
        console.log("ran")
        fetch("https://opentdb.com/api.php?amount=10")
        .then(res => res.json())
        .then(data => {
            const newData = data.results.map(result => ({
                ...result,
                options: [
                    ...result.incorrect_answers,
                    result.correct_answer
                ]
            }));
            newData.forEach(res => res.options.sort((o1, o2) =>  Math.random() - 0.5));
            setQuizData(newData);
        })

    },[])


    function handleChange(event){
        const {name,value} = event.target
        setFormData(prev => {
            return {
                ...prev,
                [name] : value
            }
        })
    }



    function handleSubmit(){
        if(quizData[count].correct_answer === formData.answer){
            setScore(prev => prev+1)
        }
        setFormData({
            answer : ""
            
        })   
        setCount(prev => prev+1)
        console.log(gameState) 
    }

    function finishQuiz(){
        if(quizData[count].correct_answer === formData.answer){
            setScore(prev => prev+1)
        }
        setGameState("endScreen")
    }
   
    if (quizData === null) return <>Loading...</>

return (
        <div className='quiz'>
            <h2 className='question'>{quizData[count].question}</h2>
            <form onSubmit={handleSubmit}>
                {quizData[count].options.map(data => (
                    <div key={data}>
                            <input
                            type="radio"
                            onChange={handleChange}
                            value={data}
                            name="answer"
                            checked={formData.answer === data}
                        />
                        <span><label> {data}</label></span>
                        <br/>
                    </div>
                ))}

                {count === 9 ? (
                    <button type="button" className='button' onClick={finishQuiz}>Finish Quiz</button>

                ):(

                <button type="button" className='button' onClick={handleSubmit}>Next Question</button>
                )}
                <h2>Current Score : {score}</h2>
            </form>
        </div>
    )
}

