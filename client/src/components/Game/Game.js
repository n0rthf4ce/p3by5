import React from 'react';
import Questions from './../Questions'
import QuestionCount from './../QuestionCount';
import Answers from './../Answers';
import teacherProfile from "../../images/user1profile.svg";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

function Game(props) {

  function renderAnswers(key) {
    return (
      <Answers
        key={key.content}
        answerContent={key.question}
        answerType={key.type}
        answer={props.answers}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );

  }

  console.log("game.js 23: ", props);
  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div className="QandA" key={props.questionId}>
        {/* <QuestionCount
          counter={props.questionId}
          total={props.questionTotal}
        /> */}
        <Questions content={props.question} />
        <div className="user">
            <img alt="teacher_icon" src={teacherProfile} />
        </div>
        {/* <ul className="answers"> </ul> */}
       <Answers 
        answers={props.answers}
        onAnswerSelected={props.handleAnswerSelected}
       />
        <QuestionCount
          counter={props.questionId}
          total={props.questionTotal}
        />
      </div>
    </CSSTransitionGroup>
  );

}


export default Game;
