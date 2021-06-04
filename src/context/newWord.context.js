import React from 'react';

export const NewWordContext = React.createContext();

class NewWordProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newWordList: JSON.parse(localStorage.getItem('newWordList') || '[]'),
      addNewWord: this.addNewWord, 
      removeWord: this.removeWord,
      addAnswer: this.addAnswer,
      check: this.check,
      shuffle: this.shuffle,
      checkSingle: this.checkSingle
    };
  }

  saveToLocal = () => {
    const { newWordList } = this.state;
    const words = newWordList.map(word => {
      return {
        word: word.word,
        answer: word.answer,
        userAnswer: '',
        check: null,
      };
    })
    localStorage.setItem('newWordList', JSON.stringify(words));
  }

  addNewWord = (word, answer) => {
    const { newWordList } = this.state;
    newWordList.push({ word, answer, userAnswer: '', check: null });
    this.setState({ newWordList });
    this.saveToLocal();
  }

  removeWord = ( index ) => {
    const { newWordList } = this.state;
    newWordList.splice(index, 1);
    this.setState({ newWordList });
    this.saveToLocal();
  }

  addAnswer = (index, answer) => {
    const { newWordList } = this.state;
    newWordList[index].userAnswer = answer;
    this.setState({ newWordList });
  }

  check = () => {
    const { newWordList } = this.state;
    const res = [];
    newWordList.forEach(word => {
      if (word.answer === word.userAnswer) {
        res.push(true);
      } else {
        res.push(false);
      }
    })
    return res;
  }

  checkSingle = (index) => {
    const { newWordList } = this.state;
    newWordList[index].check = (newWordList[index].answer === newWordList[index].userAnswer);
    this.setState(newWordList);
  }

  shuffle = () => {
    let { newWordList } = this.state;
    newWordList.sort(() => Math.random() - 0.5);
    newWordList = newWordList.map(word => {
      return {
        word: word.word,
        answer: word.answer,
        userAnswer: '',
        check: null,
      }
    })
    this.setState({ newWordList });
  }

  render() {
    return (
      <NewWordContext.Provider value={this.state}>
        {this.props.children}
      </NewWordContext.Provider>
    );
  }
}

export default NewWordProvider;