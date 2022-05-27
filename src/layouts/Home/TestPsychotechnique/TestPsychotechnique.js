import React from 'react'
import axios from 'axios'
import "../css/Homestyle.css"
import buttonSound from '../audio/button-sound.mp3';
import Loading from '../../Topnet/Loading';
import background from '../imgbackgroundTest/test-psychotechnique.png'

export default class TestPsychotechnique extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            stagiaire: [],
            questionsreponses: [],
            postID: {},

            currentQuestion: {},
            nextQuestion: {},

            currentReponses: [],
            nextReponses: [],

            repcorrecte: {},

            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            notetotale: 0,
            pourcentage: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            time: {}
        };
        this.interval = null
        this.buttonSound = React.createRef();
    }

    componentDidMount() {

        axios.get('/api/getquestionsreponses')
            .then(res => {
                if (res.data.status === 200) {
                    const questionrep = res.data.questionsreponses;
                    const currentStagiaire = res.data.stagiaire;
                    const noteTesttotale = res.data.notetotale;
                    const Pourcentage = res.data.pourcentage;
                    const postID = res.data.postid;
                    this.setState(this.state.questionsreponses = questionrep);
                    this.setState(this.state.stagiaire = currentStagiaire);
                    this.setState({ postID: postID });
                    this.setState({ postID: postID });
                    this.setState({ notetotale: noteTesttotale });
                    this.setState({ pourcentage: Pourcentage });

                    if (this.state.questionsreponses.length != 0) {

                        this.setState(this.state.currentQuestion = this.state.questionsreponses[this.state.currentQuestionIndex].question);
                        this.setState(this.state.nextQuestion = this.state.questionsreponses[this.state.currentQuestionIndex + 1].question);
                        this.setState(this.state.repcorrecte = this.state.questionsreponses[this.state.currentQuestionIndex].reponsecorrecte);
                        this.setState(this.state.currentReponses = this.state.questionsreponses[this.state.currentQuestionIndex].reponses);
                        this.setState(this.state.nextReponses = this.state.questionsreponses[this.state.currentQuestionIndex + 1].reponses);
                        this.setState({ numberOfQuestions: this.state.questionsreponses.length });

                    }

                    const dureequestions = res.data.duree
                    this.startTimer(dureequestions);
                    this.setState({ loading: false });
                }
            });


    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleOptionClick = (e) => {

        if (e.target.id === 'Oui') {

            this.correctAnswer();

        } else if (e.target.id === 'Non') {

            this.wrongAnswer();
        }

    }


    handleNextButtonClick = () => {
        this.playButtonSound();
        if (this.state.nextQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }), () => {
                this.setState(this.state.currentQuestion = this.state.questionsreponses[this.state.currentQuestionIndex].question);
                this.setState(this.state.repcorrecte = this.state.questionsreponses[this.state.currentQuestionIndex].reponsecorrecte);
                this.setState(this.state.currentReponses = this.state.questionsreponses[this.state.currentQuestionIndex].reponses);
                this.setState({ numberOfQuestions: this.state.questionsreponses.length });
            });

        }
    };





    playButtonSound = () => {

        this.buttonSound.current.play();
    };



    correctAnswer = () => {

        this.setState(prevState => ({
            score: prevState.score + (this.state.notetotale / this.state.numberOfQuestions),
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if (this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions + 1) {
                this.endTest();
            } else {
                if (this.state.questionsreponses.length != 0) {
                    this.setState(this.state.currentQuestion = this.state.questionsreponses[this.state.currentQuestionIndex].question);
                    this.setState(this.state.previousQuestion = this.state.questionsreponses[this.state.currentQuestionIndex - 1].question);
                    this.setState(this.state.repcorrecte = this.state.questionsreponses[this.state.currentQuestionIndex].reponsecorrecte);
                    this.setState(this.state.currentReponses = this.state.questionsreponses[this.state.currentQuestionIndex].reponses);
                    this.setState(this.state.previousReponses = this.state.questionsreponses[this.state.currentQuestionIndex - 1].reponses);
                    this.setState({ numberOfQuestions: this.state.questionsreponses.length });
                }
            }

        });
    }

    wrongAnswer = () => {

        this.setState(prevState => ({
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1

        }),
            () => {
                if (this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions + 1) {
                    this.endTest();
                } else {
                    if (this.state.questionsreponses.length != 0) {
                        this.setState(this.state.currentQuestion = this.state.questionsreponses[this.state.currentQuestionIndex].question);
                        this.setState(this.state.previousQuestion = this.state.questionsreponses[this.state.currentQuestionIndex - 1].question);
                        this.setState(this.state.repcorrecte = this.state.questionsreponses[this.state.currentQuestionIndex].reponsecorrecte);
                        this.setState(this.state.currentReponses = this.state.questionsreponses[this.state.currentQuestionIndex].reponses);
                        this.setState(this.state.previousReponses = this.state.questionsreponses[this.state.currentQuestionIndex - 1].reponses);
                        this.setState({ numberOfQuestions: this.state.questionsreponses.length });
                    }
                }
            });
    }


    startTimer = (duree) => {
        const countDownTime = Date.now() + (duree * 1000);
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endTest();
                });
            } else {
                this.setState({
                    time: {
                        minutes, seconds
                    }
                })
            }


        }, 1000)
    }


    endTest = () => {
        alert('Le test est terminé');
        const stagiaireStats = {
            score: this.state.score,
            notetotale: this.state.notetotale,
            pourcentage: this.state.pourcentage,
            numberOfQuestions: this.state.numberOfQuestions,
            numberOfAnsweredQuestions: this.state.numberOfAnsweredQuestions,
            correctAnswers: this.state.correctAnswers,
            wrongAnswers: this.state.wrongAnswers,
            postID: this.state.postID,
        }
        setTimeout(() => {
            this.props.history.push(`/test-psychotechnique/summary/${this.state.stagiaire._id}`, stagiaireStats);
        }, 1000);
    }



    render() {
        return (

            <div className='mainTest' style={{ backgroundImage: `url(${background})` }} >

                <div className='questions mb-3' >
                    <h2 className='H2 mb-7' >TEST PSYCHOTECHNIQUE</h2>
                    <audio ref={this.buttonSound} src={buttonSound}></audio>

                    {this.state.loading ?
                        <div style={{ color: '#fff' }}><Loading /> </div>
                        :
                        <div >
                            <span className='left' style={{ color: '#d3d3d3' }} >{this.state.currentQuestionIndex + 1}/{this.state.numberOfQuestions}</span>
                            <span className='right'  ><span style={{ color: '#0f1a5a' }}> {this.state.time.minutes}:{this.state.time.seconds} </span><span className="far fa-clock" style={{ color: '#082a55' }}></span></span>





                            <div >


                                {this.state.currentQuestion.questionText && this.state.currentQuestion.questionImage ?

                                    <div className='container-ques' data-aos="zoom-in-left" style={{ margin: 'auto' }} >
                                        <div className='options-container' >


                                            <h5 >
                                                <span className="badge   " style={{ color: '#041228', backgroundColor: 'rgb(255 255 255 / 94%)' }}>
                                                    {this.state.currentQuestion.questionText}
                                                    &nbsp;&nbsp; <img style={{ width: '2rem' }} src={`http://127.0.0.1:8000/${this.state.currentQuestion.questionImage}`} />
                                                </span>
                                            </h5>
                                        </div>
                                    </div>
                                    :
                                    this.state.currentQuestion.questionText ?
                                        <div className='container-ques' data-aos="zoom-in-left" style={{ margin: 'auto' }}>
                                            <div className='options-container'  >

                                                <h5 >
                                                    <span className="badge   " style={{ color: '#041228', backgroundColor: 'rgb(255 255 255 / 94%)' }}>
                                                        {this.state.currentQuestion.questionText}</span></h5>
                                            </div>
                                        </div>
                                        :
                                        <div className='container-ques' data-aos="zoom-in-left" style={{ marginLeft: "310px" }}>
                                            <div className='options-container'  >
                                                <span className="badge   " style={{ color: '#041228', backgroundColor: 'rgb(255 255 255 / 94%)' }}>

                                                    <img style={{ width: '2rem' }} src={`http://127.0.0.1:8000/${this.state.currentQuestion.questionImage}`} className="img-fluid" />
                                                </span>
                                            </div>
                                        </div>


                                }
                                {
                                    this.state.currentReponses.map((reponse, index) => {
                                        return (
                                            <div key={index} style={{ display: 'inline-block' }}  >

                                                {
                                                    reponse.reponseText && reponse.reponseImage ?

                                                        <div className='options-container'   >
                                                            {reponse.reponseCorrecte === "Oui" ?

                                                                <p onClick={this.handleOptionClick} className='option' id="Oui">
                                                                    {reponse.reponseText}<br></br>
                                                                    <img style={{ width: '2rem' }} src={`http://127.0.0.1:8000/${reponse.reponseImage}`} className="img-fluid" />

                                                                </p> :

                                                                <p onClick={this.handleOptionClick} className='option' id="Non">
                                                                    {reponse.reponseText}<br></br>
                                                                    <img style={{ width: '2rem' }} src={`http://127.0.0.1:8000/${reponse.reponseImage}`} className="img-fluid" />

                                                                </p>}
                                                        </div>

                                                        :
                                                        reponse.reponseText ?
                                                            <div className='options-container'  >
                                                                {reponse.reponseCorrecte === "Oui" ?
                                                                    <p onClick={this.handleOptionClick} className='option' id="Oui">{reponse.reponseText}
                                                                    </p> :
                                                                    <p onClick={this.handleOptionClick} className='option' id="Non">{reponse.reponseText}
                                                                    </p>}

                                                            </div>
                                                            :
                                                            <div className='options-container ' >
                                                                {reponse.reponseCorrecte === "Oui" ?
                                                                    <p onClick={this.handleOptionClick} className='option' id="Oui">
                                                                        <img style={{ width: '2rem' }} src={`http://127.0.0.1:8000/${reponse.reponseImage}`} className="img-fluid" />
                                                                    </p> :
                                                                    <p onClick={this.handleOptionClick} className='option' id="Non">
                                                                        <img style={{ width: '2rem' }} src={`http://127.0.0.1:8000/${reponse.reponseImage}`} className="img-fluid" />
                                                                    </p>}
                                                            </div>
                                                }
                                            </div>

                                        )
                                    })
                                }
                            </div>





                            <div style={{ marginRight: '60%' }}>


                                {this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions ?
                                    <button className='button-72' onClick={this.endTest}
                                    >Terminer</button>
                                    :
                                    <button className='button-72' onClick={this.handleNextButtonClick}>Question suivante&nbsp;&nbsp;<i className="fas fa-arrow-alt-circle-right"></i></button>
                                }


                            </div>
                        </div>

                    }

                </div>
            </div >
        )
    }
}

