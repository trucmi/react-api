import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor() { //création des tableaux
        super();
        this.state = {
            seriesList: [],
            seriesEpisodesList: [],
            value:""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleChange(event) {
        this.setState({value: event.target.value.toLowerCase()}); //transforme en minuscule

    }
    handleChange(event) {
        this.setState({value: event.target.value.trim()}); //enleve les blancs et espaces au début et en fin de chaîne

    }
    componentDidMount() {
        //Tentative de récupération du tableau de séries
        fetch('seriesList.json', {})
        //promesse d'afficher une réponse
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesList: seriesListDepuisFichier});
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(
        //Tentative de récupérer le tableau des épisodes
        fetch('seriesEpisodesList.json', {})
        //promesse d'afficher une réponse
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesEpisodesList: seriesListDepuisFichier});
            })
            .catch(function (error) {
                console.log(error);
            })
            );
    }
    //on effectue un rendu
    render() {
        return (
            <div class="wrapper">
                <div id="header">
                    <h1>Nos séries</h1>
                    <input id="recherche" type="text" placeholder="Tapez votre recherche" value={this.state.value}
                           onChange={this.handleChange}/>
                </div>
                    <ol>
                        {this.state.value !== "" ?
                            this.state.seriesList.filter(
                                a => a.seriesName.indexOf(this.state.value) > -1).map(item => <li>
                               {item.seriesName}
                                <ol>
                                    {this.state.seriesEpisodesList.filter(
                                        b => b.serie_id === item.id).map(episode => episode.episodes_list.filter(
                                        c => c.episodeName).map(name => <li>{name.episodeName}</li>)
                                    )
                                    }
                                </ol>
                            </li>)
                            //Si le champ récupéré est vide
                            : <p>T'as rien tapé</p>
                        }
                    </ol>
                </div>
        )
    }
}

export default App;
