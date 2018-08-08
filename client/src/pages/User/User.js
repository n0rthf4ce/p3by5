import React, {Component} from "react";
import PropTypes from "prop-types";
import { adminAPI, gameAPI, userAPI, scoreAPI } from "../../utils/API";
import ButtonBtn from "../../components/ButtonBtn";
import { List, ListItem } from "../../components/List";
import Play from "../GamePlay";
import Navigation from "../../components/Navigation";


require('./User.css');

class User extends Component {
    state = {
        userID: "",
        username: "username1",
        password: "password1",
        adminID: "5b66195f7e2cbc066fa39181",
        games: [],
        selectedGameID: "",
        gameScores:"",
        scores: [],
        selectedGame: {},
        gameName: "",
        gameQuestions: "",
        gameAnswers:"",
    };

    static contextTypes = {
        router: PropTypes.object,
    }

    componentDidMount() {
        // var data = sessionStorage.getItem('auth')
        this.getUserId();
    }

    getUserId = () => {
        userAPI.getUserbyUsernamePass(this.state.username, this.state.password)
            .then(res => {
                console.log("get username", res);
                this.setState({ userID: res.data._id });
                this.loadGames();
            })
            .catch(err => console.log(err));
    }

    loadGames = () => {
        adminAPI.getGamesbyAdminID(this.state.adminID)
            .then(res => {
                console.log("game id", this.state.adminID);
                this.setState({ games: res.data })
            })
            .catch (err => console.log (err));
    }   

    loadScores = event => {
        event.preventDefault();
        this.setState ({ gameScores: event.target.name });
        scoreAPI.getScore(event.target.getAttribute("id"))
            .then(res => this.setState({ scores: res.data}))
            .catch(err => console.log(err));
    }

    playGame = event => {
        event.preventDefault();
        console.log ("Play game", event.target.getAttribute("id"));
        this.setState ({ selectedGameID: event.target.getAttribute("id") })
        sessionStorage.setItem("gameID", event.target.getAttribute("id"))
        gameAPI.getGame(event.target.getAttribute("id"))
            .then(res => {
                console.log(res.data);        
            })
            .catch(err => console.log(err));
            this.context.router.history.push("/Play");
    }

    render() {

        console.log("userrrr", this.props.gameName)
        return(
            <div>
            <Navigation />
            <div className="UserWrap">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Current EduGames</h2>
                        {this.state.games.length ? (
                            <List>
                                {this.state.games.map (game => {
                                    return (
                                        <ListItem key={game._id}>
                                                <h3>{game.name}</h3> 
                                            <ButtonBtn 
                                                id={game._id}
                                                name={game.name}
                                                onClick={this.loadScores}>
                                                    High Score
                                            </ButtonBtn>
                                            <ButtonBtn 
                                                id={game._id}
                                                name={game.name}
                                                onClick={this.playGame}> 
                                                Play
                                            </ButtonBtn>
                                        </ListItem>   
                                    );
                                })}
                            </List> 
                        ): (
                            <h3>There are currently no games</h3>
                        )}
                    </div>

                    <div className="YourScore col-lg-6">
                            <h1> Your Score</h1>
                        <div className="container highScore">
                            <h2> Your Score</h2>
                            <h4>{this.state.gameScores}</h4>
                            {this.state.scores.length ? (
                                <List>
                                    {this.state.scores.map(score =>
                                        <ListItem key={score.id}>
                                            <p>{score.score}</p>
                                        </ListItem>
                                    )}
                                </List>
                            ):(
                                <h4>No Scores for this Game Yet</h4>
                            )}                            
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default User;