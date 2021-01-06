import React from 'react';

export const HistoryAnswerContext = React.createContext();

class HistoryAnswerProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      sumAcc: 0,
      sumTime: 0,
      averAcc: 0,
      averTime: 0,
      addAnswer: this.addAnswerHandler, 
      reset: this.refresh,
    };
  }

  refresh = () => {
    this.setState({
      answers: [],
      sumAcc: 0,
      sumTime: 0,
      averAcc: 0,
      averTime: 0,
    });
  }

  /**
   * Handle add answer event
   * @param {{acc: number, time: number}} answer 
   */
  addAnswerHandler = (answer) => {
    let { answers, sumAcc, sumTime } = this.state;

    const numAns = Math.min(20, answers.length+1);
    const lastAnswer = answers.length >= 20 ? answers[answers.length-20] : {ans: 1, res: 0, time: 0};

    console.log(answer);
    console.log(answers[0]);

    sumAcc += (answer.ans === answer.res ? 1 : 0) - (lastAnswer.ans === lastAnswer.res ? 1 : 0);
    sumTime += answer.time - lastAnswer.time;
    const averAcc = sumAcc / numAns;
    const averTime = sumTime / numAns;
    answers.push(answer);
    if(answers.length > 20) answers.shift();

    this.setState({answers, sumAcc, sumTime, averAcc, averTime});
  }

  render() {
    return (
      <HistoryAnswerContext.Provider value={this.state}>
        {this.props.children}
      </HistoryAnswerContext.Provider>
    );
  }
}

export default HistoryAnswerProvider;