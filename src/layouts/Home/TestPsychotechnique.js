import React from 'react'
import axios from 'axios'
import "./css/Homestyle.css"

export default class TestPsychotechnique extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionsreponses: [],

            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},

            currentReponses: [],
            nextReponses: [],
            previousReponses: [],

            // repcorrecte: '',

            numberOfQuestions: 0,
            numberOfAnsweredQuestion: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnsweres: 0,
            wrongAnsweres: 0,
            fiftyFifty: 2,
            usedFiftyFifty: false,
            time: {}
        };
    }

    async componentDidMount() {

        await axios.get('/api/getquestionsreponses')
            .then(res => {
                if (res.data.status === 200) {
                    const questionrep = res.data.questionsreponses;
                    this.setState(this.state.questionsreponses = questionrep);
                    // console.log(questionrep[0].question);
                    //console.log(questionrep[0].reponses);
                    //console.log(questionrep.length);
                    if (this.state.questionsreponses.length != 0) {

                        this.setState(this.state.currentQuestion = this.state.questionsreponses[this.state.currentQuestionIndex].question);
                        this.setState(this.state.nextQuestion = this.state.questionsreponses[this.state.currentQuestionIndex + 1].question);
                        this.setState(this.state.previousQuestion = this.state.questionsreponses[this.state.currentQuestionIndex - 1].question);


                        this.setState(this.state.currentReponses = this.state.questionsreponses[this.state.currentQuestionIndex - 1].reponses);
                        this.setState(this.state.nextReponses = this.state.questionsreponses[this.state.currentQuestionIndex - 1].reponses);
                        this.setState(this.state.previousReponses = this.state.questionsreponses[this.state.currentQuestionIndex - 1].reponses);



                    }


                }
            });


    }






    render() {
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

                    <div className='H5'>
                        <h5 >{this.state.currentQuestion.questionText}</h5>

                    </div>
                </div >
            </div >
        )
    }
}


