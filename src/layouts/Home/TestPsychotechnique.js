import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./css/Homestyle.css"

export default function TestPsychotechnique() {

    const [questions, setQuestions] = useState([]);

    const [reponses, setReponses] = useState([]);

    const [Currentquestion, setCurrentQuestions] = useState([]);
    const [Currentreponses, setCurrentReponses] = useState([]);
    const currentQuestionIndex = 0;
    // const [Nextquestion, setNextQuestions] = useState([]);
    // const [Previousquestion, setPreviousQuestions] = useState([]);


    useEffect(() => {

        axios.get('/api/getquestionsreponses').then(res => {
            if (res.data.status === 200) {
                console.log(res.data.questions, res.data.reponses);
                setQuestions(res.data.questions);
                setReponses(res.data.reponses);

                setCurrentQuestions(res.data.questions[currentQuestionIndex]);
                setCurrentReponses(res.data.reponses[currentQuestionIndex][currentQuestionIndex]);
                // setNextQuestions(res.data.questions[currentQuestionIndex + 1]);
                // setPreviousQuestions(res.data.questions[currentQuestionIndex - 1]);


            }
        });
    }, []);

    const [test, setTest] = useState({
        questions,
        reponses,
        currentQuestion: {},
        currentReponses: {},
        nextQuestion: {},
        nextReponses: {},
        previousQuestion: {},
        previousReponses: {},
        numberOfQuestions: 0,
        numberOfReponses: 0,
        numberOfAnsweredQuestion: 0,
        currentQuestionIndex: 0,
        currentAnswersIndex: 0,
        score: 0,
        correctAnswer: 0,
        wrongAnswers: 0,
        hints: 5,
        fiftyFifty: 2,
        usedFiftyFifty: false,
        time: {}
    });


    const displayQuestionsAndReponses = (
        questions = test.questions,
        reponses = test.reponses,
        currentQuestion,
        currentReponses,
        nextQuestion,
        nextReponses,
        previousQuestion,
        previousReponses) => {

        let { currentQuestionIndex } = test.currentQuestionIndex;
        let { currentAnswersIndex } = test.currentAnswersIndex;

        if ((test.questions.length == 0) || (test.reponses.length == 0)) {
            questions = test.questions;
            reponses = test.reponses;

            currentQuestion = questions[currentQuestionIndex];
            currentReponses = reponses[currentReponses];
            nextQuestion = questions[currentQuestionIndex + 1];
            nextReponses = reponses[currentAnswersIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            previousReponses = reponses[currentAnswersIndex - 1];
            setTest({
                currentQuestion,
                currentReponses,
                nextQuestion,
                nextReponses,
                previousQuestion,
                previousReponses
            })


        }

    };




    return (
        <div>
            <div className='questions mb-5'>
                <h2 className='H2'>Test psychotechnique</h2>
                <div className='lifeline-container'>
                    <p>
                        <span className='bi bi-segmented-nav'></span><span className='lifeline'>2</span>
                    </p>
                    <p>
                        <span className='bi bi-lightbulb'></span><span className='lifeline'>5</span>
                    </p>
                </div>

                <div>
                    <p>
                        <span className='left' style={{ float: 'left' }}>1 of 15</span>
                        <span className='right' style={{ float: 'right' }} > 2:15 <span className="bi bi-clock"></span></span>

                    </p>

                </div>
                {Currentquestion.questionText && Currentquestion.questionImage ?

                    <div className='H5'><h5 className='H5'>{Currentquestion.questionText}</h5>
                        <img src={`http://127.0.0.1:8000/${Currentquestion.questionImage}`} style={{ maxHeight: '10rem' }} /> </div>
                    :
                    Currentquestion.questionText ?
                        <h5 >{Currentquestion.questionText}</h5> :
                        <img src={`http://127.0.0.1:8000/${Currentquestion.questionImage}`} className="img-fluid" />

                }

                <div className='options-container'>
                    <p className='options'>{Currentreponses.reponseText}</p>
                    <p className='options'>1998</p>

                </div>
                <div className='options-container'>
                    <p className='options'>1999</p>
                    <p className='options'>2000</p>

                </div>
                <div className='button-container'>
                    <button>Précédent</button>
                    <button>Suivant</button>
                    <button>Quitter</button>


                </div>
            </div>
        </div >
    )
}
