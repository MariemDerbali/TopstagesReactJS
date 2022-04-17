import React from 'react'
import axios from 'axios'
import "../css/Homestyle.css"
import M from 'materialize-css';
import correctNotification from '../audio/correct-answer.mp3';
import wrongNotification from '../audio/wrong-answer.mp3';
import buttonSound from '../audio/button-sound.mp3';
import bg from '../img/quiz.jpg';
import Loading from '../../Topnet/Loading';

export default class TestPsychotechnique extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            stagiaire: [],
            questionsreponses: [],

            currentQuestion: {},
            nextQuestion: {},
            // previousQuestion: {},

            currentReponses: [],
            nextReponses: [],
            //previousReponses: [],

            repcorrecte: {},

            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            notetotale: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            time: {}
        };
        this.interval = null
        this.correctSound = React.createRef();
        this.wrongSound = React.createRef();
        this.buttonSound = React.createRef();
    }

    componentDidMount() {

        axios.get('/api/getquestionsreponses')
            .then(res => {
                if (res.data.status === 200) {
                    const questionrep = res.data.questionsreponses;
                    const currentStagiaire = res.data.stagiaire;
                    const noteTesttotale = res.data.notetotale;
                    this.setState(this.state.questionsreponses = questionrep);
                    this.setState(this.state.stagiaire = currentStagiaire);

                    this.setState({ notetotale: noteTesttotale });

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
            setTimeout(() => {
                this.correctSound.current.play();

            }, 500);
            this.correctAnswer();

        } else if (e.target.id === 'Non') {
            setTimeout(() => {
                this.wrongSound.current.play();

            }, 500);
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
                // this.setState(this.state.previousQuestion = this.state.questionsreponses[this.state.currentQuestionIndex - 1].question);
                this.setState(this.state.repcorrecte = this.state.questionsreponses[this.state.currentQuestionIndex].reponsecorrecte);
                this.setState(this.state.currentReponses = this.state.questionsreponses[this.state.currentQuestionIndex].reponses);
                //this.setState(this.state.previousReponses = this.state.questionsreponses[this.state.currentQuestionIndex - 1].reponses);
                this.setState({ numberOfQuestions: this.state.questionsreponses.length });
            });

        }
    };


    /*  handlePreviousButtonClick = () => {
          this.playButtonSound();
          if (this.state.previousQuestion !== undefined) {
              this.setState(prevState => ({
                  currentQuestionIndex: prevState.currentQuestionIndex - 1
              }), () => {
                  this.setState(this.state.currentQuestion = this.state.questionsreponses[this.state.currentQuestionIndex].question);
                  this.setState(this.state.nextQuestion = this.state.questionsreponses[this.state.currentQuestionIndex + 1].question);
                  this.setState(this.state.repcorrecte = this.state.questionsreponses[this.state.currentQuestionIndex].reponsecorrecte);
                  this.setState(this.state.currentReponses = this.state.questionsreponses[this.state.currentQuestionIndex].reponses);
                  this.setState(this.state.nextReponses = this.state.questionsreponses[this.state.currentQuestionIndex + 1].reponses);
                  this.setState({ numberOfQuestions: this.state.questionsreponses.length });
              });
  
  
          }
      };
  */
    handleQuitButtonClick = () => {
        this.playButtonSound();
        if (window.confirm('Êtes-vous sûr de vouloir quitter?')) {
            this.props.history.push('/');
        }
    };

    handleButtonClick = (e) => {
        switch (e.target.id) {
            case 'next-button':
                this.handleNextButtonClick();
                break;
            //  case 'previous-button':
            //    this.handlePreviousButtonClick();
            //   break;
            case 'quit-button':
                this.handleQuitButtonClick();
            default:
                break;

        }
    }
    playButtonSound = () => {

        this.buttonSound.current.play();
    };



    correctAnswer = () => {
        M.toast({
            html: 'Bonne réponse!',
            classes: 'toast-valid',
            displayLength: 1500
        });
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
        navigator.vibrate(1000);
        M.toast({
            html: 'Mauvaise réponse!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
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
            numberOfQuestions: this.state.numberOfQuestions,
            numberOfAnsweredQuestions: this.state.numberOfAnsweredQuestions,
            correctAnswers: this.state.correctAnswers,
            wrongAnswers: this.state.wrongAnswers,
        }
        setTimeout(() => {
            this.props.history.push(`/test-psychotechnique/summary/${this.state.stagiaire._id}`, stagiaireStats);
        }, 1000);
    }



    render() {
        return (

            <div className='mainTest' style={{ backgroundImage: `url(${bg})` }}>

                <div className='questions mb-5' >
                    <h2 className='H2'>Test psychotechnique</h2>
                    <audio ref={this.correctSound} src={correctNotification}></audio>
                    <audio ref={this.wrongSound} src={wrongNotification}></audio>
                    <audio ref={this.buttonSound} src={buttonSound}></audio>

                    {this.state.loading ? <Loading /> :
                        <div >
                            <p>
                                <span className='left' style={{ color: '#fff' }} >{this.state.currentQuestionIndex + 1} sur {this.state.numberOfQuestions}</span>
                                <span className='right' style={{ color: '#fff' }} > {this.state.time.minutes}:{this.state.time.seconds} <span className="far fa-clock"></span></span>

                            </p>



                            <div >


                                {this.state.currentQuestion.questionText && this.state.currentQuestion.questionImage ?

                                    <div className='container-ques' data-aos="zoom-in-left" style={{ margin: 'auto' }} >
                                        <div className='options-container' >


                                            <h5 ><span className="textDanger">Q.</span><span style={{ color: '#fff' }}>{this.state.currentQuestion.questionText}</span></h5>
                                            <img style={{ width: '2rem' }} src={`http://127.0.0.1:8000/${this.state.currentQuestion.questionImage}`} />
                                        </div>
                                    </div>
                                    :
                                    this.state.currentQuestion.questionText ?
                                        <div className='container-ques' data-aos="zoom-in-left" style={{ margin: 'auto' }}>
                                            <div className='options-container'  >

                                                <h5 ><span className="textDanger">Q.</span><span style={{ color: '#fff' }}>{this.state.currentQuestion.questionText}</span></h5>
                                            </div>
                                        </div>
                                        :
                                        <div className='container-ques' data-aos="zoom-in-left">
                                            <div className='options-container'  >
                                                <span className="textDanger">Q.</span>
                                                <img style={{ width: '2rem' }} src={`http://127.0.0.1:8000/${this.state.currentQuestion.questionImage}`} className="img-fluid" />
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

                                {/* {this.state.currentQuestionIndex === 0 ?
                                    <button className='button-71' type="button" id="previous-button" onClick={this.handleButtonClick} disabled style={{
                                        backgroundColor: '#ccc',
                                        boxShadow: 'none',
                                        opacity: '0.9',
                                        pointerEvents: 'none'
                                    }}>Précédent </button>
                                    :
                                    <button type="button" className='button-71' id="previous-button" onClick={this.handleButtonClick} >Précédent</button>
                                }*/}

                                {this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions ?
                                    <button id="next-button" className='button-72' onClick={this.endTest}
                                     /* disabled style={{
                                        backgroundColor: '#ccc',
                                        boxShadow: 'none',
                                        opacity: '0.9',
                                        pointerEvents: 'none'
                                    }}*/>Terminer</button>
                                    :
                                    <button id="next-button" className='button-72' onClick={this.handleButtonClick}>Question suivante&nbsp;&nbsp;<i className="fas fa-arrow-alt-circle-right"></i></button>
                                }

                                <button id="quit-button" className='button-73' onClick={this.handleButtonClick}>Arrêter le test</button>

                            </div>
                        </div>

                    }

                </div>
            </div >
        )
    }
}

