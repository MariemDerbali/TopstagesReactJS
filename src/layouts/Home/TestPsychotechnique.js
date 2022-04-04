import React from 'react'
import axios from 'axios'
import "./css/Homestyle.css"
import M from 'materialize-css';

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

            repcorrecte: {},

            numberOfQuestions: 0,
            numberOfAnsweredQuestion: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            time: {}
        };
    }

    async componentDidMount() {

        await axios.get('/api/getquestionsreponses')
            .then(res => {
                if (res.data.status === 200) {
                    const questionrep = res.data.questionsreponses;
                    this.setState(this.state.questionsreponses = questionrep);

                    if (this.state.questionsreponses.length != 0) {
                        this.setState(this.state.currentQuestion = this.state.questionsreponses[this.state.currentQuestionIndex].question);
                        this.setState(this.state.nextQuestion = this.state.questionsreponses[this.state.currentQuestionIndex + 1].question);
                        // this.setState(this.state.previousQuestion = this.state.questionsreponses[this.state.currentQuestionIndex - 1].question);


                        this.setState(this.state.repcorrecte = this.state.questionsreponses[this.state.currentQuestionIndex].reponsecorrecte);

                        this.setState(this.state.currentReponses = this.state.questionsreponses[this.state.currentQuestionIndex].reponses);
                        this.setState(this.state.nextReponses = this.state.questionsreponses[this.state.currentQuestionIndex + 1].reponses);
                        // this.setState(this.state.previousReponses = this.state.questionsreponses[this.state.currentQuestionIndex - 1].reponses);

                    }


                }
            });


    }


    handleOptionClick = (e) => {

        if (e.target.id === 'Oui') {
            this.correctAnswer();

        } else {
            this.wrongAnswer();
        }

    }

    correctAnswer = () => {
        M.toast({
            html: '   Correct Answer!',
            classes: 'toast-valid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion + 1
        }));
    }

    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: '  Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion + 1

        }));
    }



    render() {
        return (
            <div>
                <div className='questions mb-5'>
                    <h2 className='H2'>Test psychotechnique</h2>
                    <div className='lifeline-container'>
                        <p>
                            <span className='far fa-segmented-nav'></span><span className='lifeline'>2</span>
                        </p>
                        <p>
                            <span className='far fa-lightbulb'></span><span className='lifeline'>5</span>
                        </p>
                    </div>

                    <div>
                        <p>
                            <span className='left' style={{ float: 'left' }}>1 of 15</span>
                            <span className='right' style={{ float: 'right' }} > 2:15 <span className="far fa-clock"></span></span>

                        </p>

                    </div>

                    <div className='H5'>

                        {this.state.currentQuestion.questionText && this.state.currentQuestion.questionImage ?

                            <div className='H5'><h5 className='H5'>{this.state.currentQuestion.questionText}</h5>
                                <img src={`http://127.0.0.1:8000/${this.state.currentQuestion.questionImage}`} style={{ maxHeight: '10rem' }} /> </div>
                            :
                            this.state.currentQuestion.questionText ?
                                <h5 >{this.state.currentQuestion.questionText}</h5> :
                                <img src={`http://127.0.0.1:8000/${this.state.currentQuestion.questionImage}`} className="img-fluid" />

                        }
                        {
                            this.state.currentReponses.map((reponse, index) => {
                                return (
                                    <div className='row'>

                                        {
                                            reponse.reponseText && reponse.reponseImage ?

                                                <div className='col-md-12' key={index}>
                                                    <div className='options-container'  >
                                                        {reponse.reponseCorrecte === "Oui" ?
                                                            <p onClick={this.handleOptionClick} className='option' id="Oui">
                                                                {reponse.reponseText}<br></br>
                                                                <img src={`http://127.0.0.1:8000/${reponse.reponseImage}`} className="img-fluid" style={{ maxHeight: '4rem' }} />

                                                            </p> :

                                                            <p onClick={this.handleOptionClick} className='option' id="Non">
                                                                {reponse.reponseText}<br></br>
                                                                <img src={`http://127.0.0.1:8000/${reponse.reponseImage}`} className="img-fluid" style={{ maxHeight: '4rem' }} />

                                                            </p>}
                                                    </div>
                                                </div>

                                                :
                                                reponse.reponseText ?
                                                    <div className='col-md-12' key={index} >
                                                        <div className='options-container'  >
                                                            {reponse.reponseCorrecte === "Oui" ?
                                                                <p onClick={this.handleOptionClick} className='option' id="Oui">{reponse.reponseText}
                                                                </p> :
                                                                <p onClick={this.handleOptionClick} className='option' id="Non">{reponse.reponseText}
                                                                </p>}

                                                        </div>
                                                    </div>
                                                    :
                                                    <div className='col-md-12' key={index}>
                                                        <div className='options-container ' >
                                                            {reponse.reponseCorrecte === "Oui" ?
                                                                <p onClick={this.handleOptionClick} className='option' id="Oui">
                                                                    <img src={`http://127.0.0.1:8000/${reponse.reponseImage}`} style={{ maxHeight: '4rem' }} className="img-fluid" />
                                                                </p> :
                                                                <p onClick={this.handleOptionClick} className='option' id="Non">
                                                                    <img src={`http://127.0.0.1:8000/${reponse.reponseImage}`} style={{ maxHeight: '4rem' }} className="img-fluid" />
                                                                </p>}
                                                        </div>
                                                    </div>
                                        }
                                    </div>

                                )
                            })
                        }

                        <div className='button-container'>
                            <button>Previous</button>
                            <button>Next</button>
                            <button>Quit</button>

                        </div>

                    </div>
                </div >
            </div >
        )
    }
}


