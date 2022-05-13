import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import "../css/testSummary.css"

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


        if (userScore <= 30) {
            remark = 'Vous avez besoin de plus de pratique !';
        } else if (userScore > 30 && userScore <= 50) {
            remark = 'Plus de chance la prochaine fois';
        } else if (userScore <= 70 && userScore > 50) {
            remark = 'Vous pouvez faire mieux';
        } else if (userScore >= 71 && userScore <= 84) {
            remark = 'Excellent!';
        } else {
            remark = 'Vous êtes un génie absolu!';
        }

        if (state !== undefined) {
            stats = (
                <div>
                    <div style={{ textAlign: 'center' }}><span className='success-icon'><i className="bi bi-check-circle "></i></span></div>
                    <div ><h1 className='H1 mt-3 '>Le test est terminé</h1>
                        <div className='stats mt-5'>
                            <h4>{remark}</h4>
                            <h2 className='score'>Votre note: {this.state.score.toFixed(0)}/{this.state.notetotale}</h2>
                            <span className='stat left'>Nombre total de questions :</span>
                            <span className='right'>
                                {this.state.numberOfQuestions}
                            </span><br />

                            <span className='stat left'>Nombre total de questions répondues :</span><span className='right'>
                                {this.state.numberOfAnsweredQuestions}
                            </span><br />

                            <span className='stat left'>Nombre de bonnes réponses :</span><span className='right'>
                                {this.state.correctAnswers}
                            </span><br />

                            <span className='stat left'>Nombre de mauvaises réponses :</span><span className='right'>
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
            <div className='test-summary'>
                {stats}
            </div>
        )
    }
}
