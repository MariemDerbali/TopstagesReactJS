import React, { Component } from 'react'
import { Link } from 'react-router-dom';
//import "../css/testSummary.css"
import "../css/Homestyle.css"
import imgTestSummary from '../imgbackgroundTest/test-summary.jpg'

export default class TestSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0,

        };
    }
    componentDidMount() {
        const { state } = this.props.location;
        this.setState({
            score: state.score,
            notetotale: state.notetotale,
            pourcentage: state.pourcentage,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            postID: state.postID,
            type: state.type,
            domaine: state.domaine,

        });
    }



    render() {
        const { state } = this.props.location;
        let stats, remark;
        const userScore = (this.state.score / this.state.notetotale) * 100;

        console.log((this.state.score / this.state.notetotale) * 100);

        if (userScore < this.state.pourcentage) {
            remark = 'Plus de chance la prochaine fois';
        } else if (userScore >= this.state.pourcentage) {
            remark = 'Excellent!';
        }

        if (state !== undefined) {
            stats = (
                <div>

                    <div ><h1 className=' mt-3 ' style={{ color: '#fff' }}>VOTRE RÉSULTAT DE TEST</h1>
                        <div className='mt-5'>
                            <h4 style={{ color: '#fff', fontWeight: '300', fontSize: '1.5em', lineHeight: '1.17em' }}>{remark}</h4>
                            <h2 style={{ color: '#ef8e1f' }}  >Note: {this.state.score.toFixed(0)}/{this.state.notetotale}</h2>
                            <span className='left'>Nombre total de questions :</span>
                            <span className='right'>
                                {this.state.numberOfQuestions}
                            </span><br />

                            <span className='left'>Nombre total de questions répondues :</span><span className='right'>
                                {this.state.numberOfAnsweredQuestions}
                            </span><br />

                            <span className='left'>Nombre de bonnes réponses :</span><span className='right'>
                                {this.state.correctAnswers}
                            </span><br />

                            <span className='left'>Nombre de mauvaises réponses :</span><span className='right'>
                                {this.state.wrongAnswers}
                            </span><br />

                        </div>
                        <section className='section'>
                            <ul>
                                {remark === 'Excellent!' || remark === 'Vous êtes un génie absolu!' ?
                                    <li><Link to={`/postuler/${this.state.postID}`}>Cliquer pour postuler</Link></li> : <li><Link to='/'>Retour à la page d'accueil</Link></li>}


                            </ul>
                        </section>
                    </div>
                </div>
            );
        } else {
            stats = (<div className='H1'><h1 className='no-stats'>No Stats available please take a quiz </h1>
                <section className='section'>
                    <ul>
                        <li><Link to='/'>Back to home</Link></li>

                    </ul>
                </section></div>);
        }
        return (

            <section id="hero">
                <div >
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="carousel-container">
                                <div className="carousel-content animate__animated animate__fadeInUp text-center">
                                    <p>  {stats}</p>
                                </div>
                            </div>
                            <img src={imgTestSummary} className="d-block w-100" alt="..." />
                        </div>


                    </div>

                </div>
            </section>

        )
    }
}
